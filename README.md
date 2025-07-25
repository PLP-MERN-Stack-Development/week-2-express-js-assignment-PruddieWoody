# Express.js Products API

A RESTful API built with Express.js that allows you to manage a list of products. The API includes standard CRUD operations, filtering, search, pagination, logging, authentication, validation, and error handling.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Setup environment variables:**
    - Copy `.env.example` to `.env` and set your API key:
      ```
      API_KEY=your-secret-api-key
      ```

4. **Run the server:**
    ```sh
    npm start
    ```
    The server will start on [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Usage

All API requests to `/api/products` require the header:

```
x-api-key: your-secret-api-key
```

---

## 📚 API Endpoints

### Hello World

- **GET /**  
  Returns a simple message to verify the server is running.

  **Response:**
  ```json
  "Hello World"
  ```

---


## ⚠️ Error Responses

- **401 Unauthorized**  
  Missing/invalid API key.
  ```json
  { "error": "Unauthorized: Invalid API key" }
  ```

- **404 Not Found**  
  Product not found.
  ```json
  { "error": "Product not found" }
  ```

- **400 Bad Request**  
  Validation error.
  ```json
  { "error": "Invalid product data" }
  ```

---

## 📝 Notes

- You can test all endpoints using [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or `curl`.
- Data is stored in memory (no database), so changes reset when the server restarts.

---

