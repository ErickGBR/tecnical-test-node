# Node.js CRUD API with SQLite

This project is a CRUD API built with Node.js and SQLite. It manages Authors and Books, providing endpoints to create, read, update, and delete records. Unit tests are included using Jest.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authors](#authors)
  - [Books](#books)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ErickGBR/tecnical-test-node.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tecnical-test-node
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000`.

## API Endpoints

### Authors

- **GET /authors**: Get all authors
- **GET /authors/:id**: Get a single author by ID
- **POST /authors**: Create a new author
  - Request body:
    ```json
    {
      "name": "Author Name"
    }
    ```
- **PUT /authors/:id**: Update an author by ID
  - Request body:
    ```json
    {
      "name": "Updated Author Name"
    }
    ```
- **DELETE /authors/:id**: Delete an author by ID

### Books

- **GET /books**: Get all books
- **GET /books/:id**: Get a single book by ID
- **POST /books**: Create a new book
  - Request body:
    ```json
    {
      "title": "Book Title",
      "authorId": 1
    }
    ```
- **PUT /books/:id**: Update a book by ID
  - Request body:
    ```json
    {
      "title": "Updated Book Title",
      "authorId": 1
    }
    ```
- **DELETE /books/:id**: Delete a book by ID

## Running Tests

1. Run the tests with Jest:
   ```bash
   npm test
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
