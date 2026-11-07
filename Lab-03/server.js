
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = 3000;

app.use(express.json());

// Database connection
let db;

async function connectDatabase() {
    db = await open({
        filename: "./books.db",
        driver: sqlite3.Database
    });

    // Create books table if it does not exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            price REAL NOT NULL
        )
    `);

    console.log("Database connected successfully");
}

// GET /books - Retrieve books with search, sorting, pagination and price filter
app.get("/books", async (req, res, next) => {
    try {
        const {
            search_q = "",
            order_by = "id",
            order = "ASC",
            limit = "10",
            offset = "0",
            min_price,
            max_price
        } = req.query;

        // Validate sorting column
        const allowedColumns = ["id", "title", "author", "price"];

        if (!allowedColumns.includes(order_by)) {
            return res.status(400).json({
                message: "Invalid order_by column"
            });
        }

        // Validate sorting order
        const sortOrder = order.toUpperCase();

        if (!["ASC", "DESC"].includes(sortOrder)) {
            return res.status(400).json({
                message: "Order must be ASC or DESC"
            });
        }

        // Validate pagination
        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (
            !Number.isInteger(pageLimit) ||
            pageLimit < 1 ||
            !Number.isInteger(pageOffset) ||
            pageOffset < 0
        ) {
            return res.status(400).json({
                message: "Limit must be positive and offset must be non-negative"
            });
        }

        const conditions = [];
        const params = [];

        // Search by partial book title
        if (search_q.trim()) {
            conditions.push("title LIKE ?");
            params.push(`%${search_q.trim()}%`);
        }

        // Minimum price filter
        if (min_price !== undefined) {
            const min = Number(min_price);

            if (!Number.isFinite(min)) {
                return res.status(400).json({
                    message: "min_price must be numeric"
                });
            }

            conditions.push("price >= ?");
            params.push(min);
        }

        // Maximum price filter
        if (max_price !== undefined) {
            const max = Number(max_price);

            if (!Number.isFinite(max)) {
                return res.status(400).json({
                    message: "max_price must be numeric"
                });
            }

            conditions.push("price <= ?");
            params.push(max);
        }

        if (
            min_price !== undefined &&
            max_price !== undefined &&
            Number(min_price) > Number(max_price)
        ) {
            return res.status(400).json({
                message: "min_price cannot be greater than max_price"
            });
        }

        const whereClause = conditions.length
            ? "WHERE " + conditions.join(" AND ")
            : "";

        // Fetch matching books
        const books = await db.all(
            `SELECT * FROM books
             ${whereClause}
             ORDER BY ${order_by} ${sortOrder}
             LIMIT ? OFFSET ?`,
            [...params, pageLimit, pageOffset]
        );

        res.status(200).json({
            message: "Books retrieved successfully",
            count: books.length,
            data: books
        });

    } catch (error) {
        next(error);
    }
});

// GET /books/:id - Retrieve a particular book
app.get("/books/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        const book = await db.get(
            "SELECT * FROM books WHERE id = ?",
            [id]
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book retrieved successfully",
            data: book
        });

    } catch (error) {
        next(error);
    }
});

// POST /books - Add a new book
app.post("/books", async (req, res, next) => {
    try {
        const { title, author, price } = req.body;

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof author !== "string" ||
            !author.trim() ||
            price === undefined ||
            price === null ||
            typeof price !== "number" ||
            !Number.isFinite(price)
        ) {
            return res.status(400).json({
                message: "Title, author and valid numeric price are required"
            });
        }

        const result = await db.run(
            "INSERT INTO books (title, author, price) VALUES (?, ?, ?)",
            [title.trim(), author.trim(), price]
        );

        const newBook = await db.get(
            "SELECT * FROM books WHERE id = ?",
            [result.lastID]
        );

        res.status(201).json({
            message: "Book created successfully",
            data: newBook
        });

    } catch (error) {
        next(error);
    }
});

// PUT /books/:id - Update an existing book
app.put("/books/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { title, author, price } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof author !== "string" ||
            !author.trim() ||
            price === undefined ||
            price === null ||
            typeof price !== "number" ||
            !Number.isFinite(price)
        ) {
            return res.status(400).json({
                message: "Title, author and valid numeric price are required"
            });
        }

        const result = await db.run(
            `UPDATE books
             SET title = ?, author = ?, price = ?
             WHERE id = ?`,
            [title.trim(), author.trim(), price, id]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        const updatedBook = await db.get(
            "SELECT * FROM books WHERE id = ?",
            [id]
        );

        res.status(200).json({
            message: "Book updated successfully",
            data: updatedBook
        });

    } catch (error) {
        next(error);
    }
});

// DELETE /books/:id - Delete a book
app.delete("/books/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        const result = await db.run(
            "DELETE FROM books WHERE id = ?",
            [id]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        next(error);
    }
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Central error handler
app.use((err, req, res, next) => {
    console.error(err.message);

    res.status(500).json({
        message: "Internal server error"
    });
});

// Start server after connecting to database
async function startServer() {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

startServer();
