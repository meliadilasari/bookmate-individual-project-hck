const request = require("supertest");
const app = require("../app");
const { sequelize, Book } = require("../models/index");
const { hashedPassword } = require("../helpers/bcrypt");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const axios = require("axios");
require("dotenv").config();
let token;

beforeAll(async () => {
  const data = [
    {
      fullName: "Melia Dilasari",
      email: "melia@gmail.com",
      password: "12345",
      role: "Admin",
    },
  ].map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    el.password = hashedPassword(el.password);
    return el;
  });

  const dataBook = require("../data/dataBook.json");

  await Book.bulkCreate(dataBook);
  await sequelize.queryInterface.bulkInsert("Users", data, {});
  token = signToken({ id: 1 });
});

describe("POST /register", () => {
  test("Succes post /register", async () => {
    const dataToInsert = {
      fullName: "faizal",
      email: "faizal@gmail.com",
      password: "12345",
      role: "User",
    };
    const response = await request(app).post("/register").send(dataToInsert);
    const { body, status } = response;

    expect(status).toBe(201);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("id", 2);
    expect(body).toHaveProperty("email", "faizal@gmail.com");
  });

  test("Error post /register full name is empty", async () => {
    const dataToInsert = {
      fullName: "",
      email: "faizal@gmail.com",
      password: "12345",
      role: "User",
    };
    const response = await request(app).post("/register").send(dataToInsert);
    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toBe("Full name is required!");
  });

  test("Error post /register full name not provided", async () => {
    const dataToInsert = {
      email: "faizal@gmail.com",
      password: "12345",
      role: "User",
    };
    const response = await request(app).post("/register").send(dataToInsert);
    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toBe("Full name is required!");
  });

  test("Error post /register email is empty", async () => {
    const dataToInsert = {
      fullName: "faizal",
      email: "",
      password: "12345",
      role: "User",
    };
    const response = await request(app).post("/register").send(dataToInsert);
    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toBe("Email is required!");
  });

  test("Error post /register email not provided", async () => {
    const dataToInsert = {
      fullName: "faizal",
      password: "12345",
      role: "User",
    };
    const response = await request(app).post("/register").send(dataToInsert);
    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toBe("Email is required!");
  });

  test("Error post /register incorrect email format ", async () => {
    const dataToInsert = {
      fullName: "faizal",
      email: "qwerty",
      password: "12345",
      role: "User",
    };
    const response = await request(app).post("/register").send(dataToInsert);
    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toBe("Invalid email format!");
  });

  test("Error post /register password is empty", async () => {
    const dataToInsert = {
      fullName: "faizal",
      email: "faizal@gmail.com",
      password: "",
      role: "User",
    };
    const response = await request(app).post("/register").send(dataToInsert);
    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toBe("Password is required!");
  });

  test("Error post /register password not provided", async () => {
    const dataToInsert = {
      fullName: "faizal",
      email: "faizal@gmail.com",
      role: "User",
    };
    const response = await request(app).post("/register").send(dataToInsert);
    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toBe("Password is required!");
  });

  test("Error post /register password is less than 5", async () => {
    const dataToInsert = {
      fullName: "faizal",
      email: "faizal@gmail.com",
      password: "1234",
      role: "User",
    };
    const response = await request(app).post("/register").send(dataToInsert);
    const { body, status } = response;

    expect(status).toBe(400);
    expect(body).toBe("Password minimum length is 5 characters!");
  });
});

describe("POST /login", () => {
  test("sucess login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "melia@gmail.com", password: "12345" });

    // console.log(response);
    const { body, status } = response;
    //token = body["access_token"];
    // console.log(token);
    expect(status).toBe(200);

    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("access_token", expect.any(String));
  });
});

describe("GET /books", () => {
  test("Succes get /books", async () => {
    const response = await request(app)
      .get("/books")
      .set("Authorization", `Bearer ${token}`);
    const { body, status } = response;

    console.log(response.body);
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(body[0]).toBeInstanceOf(Object);
    expect(body[0]).toHaveProperty("id", expect.any(Number));
    expect(body[0]).toHaveProperty("title", expect.any(String));
    expect(body[0]).toHaveProperty("authors", expect.any(String));
    expect(body[0]).toHaveProperty("publisher", expect.any(String));
    expect(body[0]).toHaveProperty("description", expect.any(String));
    expect(body[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(body[0]).toHaveProperty("updatedAt", expect.any(String));
  });

  test("Error get /books no authorization", async () => {
    const response = await request(app).get("/books");

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toBe("Invalid token");
  });
});

describe("GET /books/:id", () => {
  test("Succes get /books/:id", async () => {
    const response = await request(app)
      .get("/books/1")
      .set("Authorization", "Bearer " + token);

    const { body, status } = response;

    expect(status).toBe(200);

    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("id", expect.any(Number));
    expect(body).toHaveProperty("title", expect.any(String));
    expect(body).toHaveProperty("authors", expect.any(String));
    expect(body).toHaveProperty("publisher", expect.any(String));
    expect(body).toHaveProperty("description", expect.any(String));
    expect(body).toHaveProperty("imgUrl", expect.any(String));
    expect(body).toHaveProperty("createdAt", expect.any(String));
    expect(body).toHaveProperty("updatedAt", expect.any(String));
  });
});

describe("GET /books/:id", () => {
  test("Error get /books/:id no authorization", async () => {
    const response = await request(app).get("/books/1");

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toBe("Invalid token");
  });
});

test("Success POST /mybooks/:id ", async () => {
  const response = await request(app)
    .post("/mybooks/1")
    .send({ UserId: 1, BookId: 1 })
    .set("Authorization", "Bearer " + token);
  const { body, status } = response;

  expect(status).toBe(201);
  expect(body).toBeInstanceOf(Object);
  expect(body).toHaveProperty("rating", 0);
  expect(body).toHaveProperty("status", "Want to read");
  expect(body).toHaveProperty("id", 1);
  expect(body).toHaveProperty("UserId", 1);
  expect(body).toHaveProperty("BookId", 1);
  expect(body).toHaveProperty("createdAt", expect.any(String));
  expect(body).toHaveProperty("updatedAt", expect.any(String));
});

test("Error POST /mybooks/:id book not found", async () => {
  const response = await request(app)
    .post("/mybooks/1234")
    .send({ UserId: 1, BookId: 1234 })
    .set("Authorization", "Bearer " + token);
  const { body, status } = response;

  expect(status).toBe(404);
  expect(body).toBeInstanceOf(Object);
  expect(body).toHaveProperty("message", "Book not found");
});

test("Error POST /mybooks/:id book already in list", async () => {
  const response = await request(app)
    .post("/mybooks/1")
    .send({ UserId: 1, BookId: 1 })
    .set("Authorization", "Bearer " + token);
  const { body, status } = response;

  expect(status).toBe(409);
  expect(body).toBeInstanceOf(Object);
  expect(body).toHaveProperty("message", "This book is already in your list!");
});

test("Error POST /mybooks/:id no authorization", async () => {
  const response = await request(app)
    .post("/mybooks/1")
    .send({ UserId: 1, BookId: 1 });

  const { body, status } = response;

  expect(status).toBe(401);
  expect(body).toBe("Invalid token");
});

describe("GET /myBooks", () => {
  test("Succes get /mybooks", async () => {
    const response = await request(app)
      .get("/mybooks")
      .set("Authorization", "Bearer " + token);

    const { body, status } = response;

    console.log(body);
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(body[0]).toBeInstanceOf(Object);
    expect(body[0]).toHaveProperty("id", expect.any(Number));
    expect(body[0]).toHaveProperty("rating", expect.any(Number));
    expect(body[0]).toHaveProperty("status", expect.any(String));
    expect(body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(body[0]).toHaveProperty("BookId", expect.any(Number));
    expect(body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(body[0]).toHaveProperty("updatedAt", expect.any(String));
    expect(body[0]).toHaveProperty("Book");
    expect(body[0].Book).toHaveProperty("id", expect.any(Number));
    expect(body[0].Book).toHaveProperty("title", expect.any(String));
    expect(body[0].Book).toHaveProperty("authors", expect.any(String));
    expect(body[0].Book).toHaveProperty("publisher", expect.any(String));
    expect(body[0].Book).toHaveProperty("description", expect.any(String));
    expect(body[0].Book).toHaveProperty("imgUrl", expect.any(String));
    expect(body[0].Book).toHaveProperty("createdAt", expect.any(String));
    expect(body[0].Book).toHaveProperty("createdAt", expect.any(String));
  });

  test("Error get /mybooks no authorization", async () => {
    const response = await request(app).get("/mybooks");

    const { body, status } = response;

    console.log(body);
    expect(status).toBe(401);
    expect(body).toBe("Invalid token");
  });
});

describe("DELETE /myBooks/:id", () => {
  test("Success delete /mybooks/:id ", async () => {
    const response = await request(app)
      .delete("/mybooks/1")
      .set("Authorization", "Bearer " + token);

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toHaveProperty("message", "Book has been removed");
  });
});

describe("DELETE /myBooks/:id", () => {
  test("Error get /mybooks/:id book not found", async () => {
    const response = await request(app)
      .delete("/mybooks/2222")
      .set("Authorization", "Bearer " + token);

    const { body, status } = response;

    expect(status).toBe(404);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Book not found");
  });
});

describe("DELETE /myBooks/:id", () => {
  test("Error get /mybooks/:id no authorization", async () => {
    const response = await request(app).delete("/mybooks/1");

    const { body, status } = response;

    expect(status).toBe(401);

    expect(body).toBe("Invalid token");
  });
});

test("Success update /mybooks/:id ", async () => {
  const response = await request(app)
    .put("/mybooks/1")
    .send({ status: "Read" })
    .set("Authorization", "Bearer " + token);
  const { body, status } = response;

  expect(status).toBe(200);
  expect(body).toBeInstanceOf(Object);
  expect(body).toHaveProperty("message", "Book has been updated");
});

test("Error update /mybooks/:id no authorization", async () => {
  const response = await request(app)
    .put("/mybooks/1")
    .send({ status: "Read" });

  const { body, status } = response;

  expect(status).toBe(401);
  expect(body).toBe("Invalid token");
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Books", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
