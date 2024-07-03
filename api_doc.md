# myLibrary API Documentation

list of available endpoints:

- `POST /register`
- `POST /Login`
- `GET /books`
- `GET /books/:id`
- `POST /mybooks`
- `GET /mybooks`
- `PUT /mybooks/:id`
- `DELETE /mybooks/:id`

&nbsp;

## 1. POST /register

Description:

- Register user

Request:

- body:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required!"
}
OR
{
  "message": "Full name is required!"
}
OR
{
  "message": "Invalid email format!"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Password minimum length is 5 characters!"
}

```

&nbsp;

## 2. POST /login

Description:

- Login user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "<token>"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
OR
{
  "message": "Email is required!"
}
OR
{
  "message": "Password is required!"
}
```

&nbsp;

## 3. GET /books

Description:

- Fetch all books in database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "Integer",
    "title": "String",
    "authors": "String",
    "publisher": "String",
    "description": "String",
    "imgUrl": "String"
  },
  {
    "id": "Integer",
    "title": "String",
    "authors": "String",
    "publisher": "String",
    "description": "String",
    "imgUrl": "String"
  }
]
```

&nbsp;

## 4. GET /books/:id

Description:

- fetch book details by id.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": "Integer",
  "title": "String",
  "authors": "String",
  "publisher": "String",
  "description": "String",
  "imgUrl": "String"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
```

&nbsp;

## 5. POST /mybooks/:id

Description:

- add book to user book list.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "rating": "Integer",
  "status": "String",
  "UserId": "Integer",
  "BookId": "Integer"
}
```

_Response (201 - Created)_

```json
{
  "id": "Integer",
  "rating": "Integer",
  "status": "String",
  "UserId": "Integer",
  "BookId": "Integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Status is required!"
}
OR
{
  "message": "UserId is required!"
}
OR
{
  "message": "BookId is required!"
}
```

_Response (409 - Conflict)_

```json
{
  "message": "This book is already in your list!"
}
```

&nbsp;

## 6. GET /mybooks

Description:

- Fetch all user books

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "Integer",
    "rating": "Integer",
    "status": "String",
    "UserId": "Integer",
    "BookId": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date",
    "Book": {
      "id": "Integer",
      "title": "String",
      "authors": "String",
      "publisher": "String",
      "description": "String",
      "imgUrl": "String",
      "createdAt": "Date",
      "updatedAt": "Date"
    }
  },
  {
    "id": "Integer",
    "rating": "Integer",
    "status": "String",
    "UserId": "Integer",
    "BookId": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date",
    "Book": {
      "id": "Integer",
      "title": "String",
      "authors": "String",
      "publisher": "String",
      "description": "String",
      "imgUrl": "String",
      "createdAt": "Date",
      "updatedAt": "Date"
    }
  }
]
```

&nbsp;

## 7. PUT /mybooks/:id

Description:

- Updated user's `rating`
- Updated user's book `status` to `Read` or `Want to read`

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "Integer"
}
```

- body:

```json
{
  "rating": "Integer"
}
OR
{
  "status": "String"
}
```

_Response (200 - OK)_

````json
{
  "message": "Book has been updated"
}

_Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
````

&nbsp;

## 8. DELETE /mybooks/:id

Description:

- Delete user book by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Book has been removed"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
```

&nbsp;

## Global Errror

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
