# Lab 03 – REST API, Query Parameters, Validation and Debugging

## Student Details

- **Student Name:** Chada Varshini
- **Registration Number:** 252U1R1050
- **Section:** CSE - CORE (223 & S15)
- **Course:** Backend Development Fundamentals

---

## 1. Introduction

This lab focuses on developing a RESTful API using Node.js and Express.js. The Books API supports CRUD operations, searching, sorting, pagination, and price-range filtering through query parameters.

Input validation and appropriate HTTP status codes are implemented to handle invalid requests and errors effectively. Postman is used to test the API endpoints and verify their responses.

## 2. Objectives

- Develop RESTful API endpoints using Node.js and Express.js.
- Implement CRUD operations for managing books.
- Support searching books using query parameters.
- Implement sorting and pagination.
- Filter books based on minimum and maximum prices.
- Validate incoming request data.
- Handle errors using appropriate HTTP status codes.
- Test API functionality using Postman.

## 3. Technologies Used

- **Node.js** – JavaScript runtime environment.
- **Express.js** – Web framework for building REST APIs.
- **SQLite** – Database for storing book records.
- **Postman** – API testing tool.
- **Visual Studio Code** – Development environment.

## 4. Project Structure

```text
Lab-03/
│
├── Screenshots/
│   ├── GET_All_Books.png
│   ├── GET_Pagination.png
│   ├── GET_Price_Filter.png
│   ├── GET_Search_Books.png
│   ├── GET_Sorting.png
│   ├── Invalid_Min_Price.png
│   ├── Invalid_Max_Price.png
│   ├── Invalid_Price_Range.png
│   ├── POST_Create_Book.png
│   ├── POST_Validation_Error.png
│   ├── PUT_Update_Book.png
│   ├── DELETE_Book.png
│   └── DELETE_Not_Found.png
│
├── postman/
│   └── Books_API_Collection.json
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 5. Installation and Setup

### Step 1: Install Node.js

Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).

### Step 2: Navigate to the project directory

```bash
cd Lab-03
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the server

```bash
npm start
```

The server runs at:

```text
http://localhost:3000
```

## 6. API Endpoints

The Books API provides the following endpoints:

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update an existing book |
| DELETE | `/books/:id` | Delete a book |

## 7. Query Parameters

The GET `/books` endpoint supports the following query parameters:

| Parameter | Description |
|---|---|
| `search_q` | Search books by partial title |
| `order_by` | Specify the column for sorting |
| `order` | Sort in ASC or DESC order |
| `limit` | Specify the maximum number of records |
| `offset` | Specify the number of records to skip |
| `min_price` | Filter books with a minimum price |
| `max_price` | Filter books with a maximum price |

### Example Requests

**Search books:**

```text
GET /books?search_q=Harry
```

**Sort books by price:**

```text
GET /books?order_by=price&order=DESC
```

**Pagination:**

```text
GET /books?limit=5&offset=0
```

**Price filtering:**

```text
GET /books?min_price=100&max_price=500
```

## 8. Input Validation and HTTP Status Codes

Input validation is performed to ensure that the API receives valid data.

- Required fields such as title and author must be provided.
- Price must be a valid numeric value.
- Invalid price parameters are rejected.
- Minimum price should not exceed maximum price.
- Nonexistent book IDs are handled appropriately.

The following HTTP status codes are used:

| Status Code | Description |
|---|---|
| 200 OK | Request completed successfully |
| 201 Created | New book created successfully |
| 400 Bad Request | Invalid request data or parameters |
| 404 Not Found | Requested book does not exist |
| 500 Internal Server Error | Unexpected server error |

## 9. Postman Testing

The Books REST API was tested using Postman to verify the functionality of CRUD operations, query parameters, pagination, sorting, price filtering, and input validation.

The following test cases were performed to verify successful API responses and error-handling scenarios.

### 9.1 GET All Books

**Test:** Retrieve all books from the database.

![GET All Books](Screenshots/GET_All_Books.png)

### 9.2 GET Pagination

**Test:** Verify pagination using limit and offset query parameters.

![GET Pagination](Screenshots/GET_Pagination.png)

### 9.3 GET Price Filter

**Test:** Filter books based on minimum and maximum price.

![GET Price Filter](Screenshots/GET_Price_Filter.png)

### 9.4 GET Search Books

**Test:** Search for books using partial title matching.

![GET Search Books](Screenshots/GET_Search_Books.png)

### 9.5 GET Sorting

**Test:** Verify ascending (ASC) and descending (DESC) sorting.

![GET Sorting](Screenshots/GET_Sorting.png)

### 9.6 Invalid Minimum Price

**Test:** Verify validation when an invalid minimum price is provided.

![Invalid Minimum Price](Screenshots/Invalid_Min_Price.png)

### 9.7 Invalid Maximum Price

**Test:** Verify validation when an invalid maximum price is provided.

![Invalid Maximum Price](Screenshots/Invalid_Max_Price.png)

### 9.8 Invalid Price Range

**Test:** Verify validation when the minimum price is greater than the maximum price.

![Invalid Price Range](Screenshots/Invalid_Price_Range.png)

### 9.9 POST Create Book

**Test:** Add a new book to the database using a POST request.

![POST Create Book](Screenshots/POST_Create_Book.png)

### 9.10 POST Validation Error

**Test:** Verify input validation when invalid or missing book details are provided.

![POST Validation Error](Screenshots/POST_Validation_Error.png)

### 9.11 PUT Update Book

**Test:** Update the details of an existing book using a PUT request.

![PUT Update Book](Screenshots/PUT_Update_Book.png)

### 9.12 DELETE Book

**Test:** Delete an existing book from the database.

![DELETE Book](Screenshots/DELETE_Book.png)

### 9.13 DELETE Not Found

**Test:** Verify the 404 Not Found response when attempting to delete a nonexistent book.

![DELETE Not Found](Screenshots/DELETE_Not_Found.png)

## 10. Postman Collection

The exported Postman collection containing the API test requests is available in the `postman` folder.

**Collection file:** `postman/Books_API_Collection.json`

## 11. Error Handling and Debugging

Common errors encountered during development and their solutions include:

- **EADDRINUSE:** Occurs when the selected port is already in use. Resolved by stopping the existing process or using another port.
- **Incorrect import path:** Resolved by checking module paths and filenames.
- **Database or table errors:** Resolved by verifying database connections and table names.
- **Missing await:** Resolved by properly handling asynchronous database operations.

## 12. Conclusion

The lab demonstrates the development of a RESTful Books API using Node.js, Express.js, and SQLite. CRUD operations, search, sorting, pagination, price filtering, and input validation are implemented and tested using Postman.

The exercise provides practical experience in building REST APIs, handling errors, validating requests, and testing backend applications.

---

**Course:** Backend Development Fundamentals  
**Lab:** 03 – REST API, Query Parameters, Validation and Debugging