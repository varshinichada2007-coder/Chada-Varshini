# Lab 03 – REST API, Query Parameters and Validation

## Backend Development Fundamentals

### 1. Project Overview

This project demonstrates RESTful API development using Node.js and Express.js. It implements CRUD operations for managing book records, along with query parameters, pagination, sorting, filtering, and input validation.

### 2. Technologies Used

- Node.js
- Express.js
- JavaScript
- SQLite Database
- Postman
- Git and GitHub

### 3. Project Features

- GET – Retrieve all books and individual book details.
- POST – Add new books to the database.
- PUT – Update existing book details.
- DELETE – Delete books from the database.
- Search books using query parameters.
- Pagination to display records in pages.
- Price-based filtering.
- Sorting book records.
- Input validation and error handling.

### 4. Project Structure

```text
Lab-03/
│
├── Screenshots/
├── postman/
├── node_modules/
├── .gitignore
├── books.db
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

Note: node_modules is excluded from GitHub using .gitignore.

### 5. Installation and Setup

**Step 1: Install dependencies**

```bash
npm install
```

**Step 2: Start the server**

```bash
npm start
```

The server runs locally at:

`http://localhost:3000`

### 6. API Testing Using Postman

The following operations were tested using Postman:

| No. | Test Case |
|---|---|
| 1 | GET All Books |
| 2 | GET Search Books |
| 3 | GET Pagination |
| 4 | GET Price Filter |
| 5 | GET Sorting |
| 6 | Invalid Minimum Price |
| 7 | Invalid Maximum Price |
| 8 | Invalid Price Range |
| 9 | POST Create Book |
| 10 | POST Validation Error |
| 11 | PUT Update Book |
| 12 | DELETE Book |
| 13 | DELETE Not Found |

### 7. Screenshots

#### 7.1 GET All Books

![GET All Books](Screenshots/GET_All_Books.png)

#### 7.2 GET Search Books

![GET Search Books](Screenshots/GET_Search_Books.png)

#### 7.3 GET Pagination

![GET Pagination](Screenshots/GET_Pagination.png)

#### 7.4 GET Price Filter

![GET Price Filter](Screenshots/GET_Price_Filter.png)

#### 7.5 GET Sorting

![GET Sorting](Screenshots/GET_Sorting.png)

#### 7.6 Invalid Minimum Price

![Invalid Minimum Price](Screenshots/Invalid_Min_Price.png)

#### 7.7 Invalid Maximum Price

![Invalid Maximum Price](Screenshots/Invalid_Max_Price.png)

#### 7.8 Invalid Price Range

![Invalid Price Range](Screenshots/Invalid_Price_Range.png)

#### 7.9 POST Create Book

![POST Create Book](Screenshots/POST_Create_Book.png)

#### 7.10 POST Validation Error

![POST Validation Error](Screenshots/POST_Validation_Error.png)

#### 7.11 PUT Update Book

![PUT Update Book](Screenshots/PUT_Update_Book.png)

#### 7.12 DELETE Book

![DELETE Book](Screenshots/DELETE_Book.png)

#### 7.13 DELETE Not Found

![DELETE Not Found](Screenshots/DELETE_Not_Found.png)

### 8. Postman Collection

The Postman collection containing the API requests is available in the `postman/` folder.

### 9. Learning Outcomes

- Understanding REST API architecture.
- Working with HTTP methods and status codes.
- Handling JSON requests and responses.
- Implementing query parameters.
- Performing CRUD operations.
- Validating user inputs.
- Testing APIs using Postman.

### 10. Conclusion

This lab helped me understand RESTful API development using Node.js and Express.js. I learned how to perform CRUD operations, handle query parameters, implement validation, and test API endpoints using Postman.
