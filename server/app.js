const express = require("express");
const app = express();
const { User, Book, UserBookList } = require("./models");
const { comparePassword } = require("./helpers/bcrypt");
const { signToken } = require("./helpers/jwt");
const authentication = require("./middleware/authentication");
const errorHandler = require("./middleware/errorHandler");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
require("dotenv").config();
const OpenAI = require("./helpers/openai");

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//register
app.post("/register", async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    next(error);
  }
});

//login
app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) throw { name: "Email is required!" };
    if (!password) throw { name: "Password is required!" };

    const user = await User.findOne({ where: { email } });
    if (!user) throw { name: "Invalid email/password" };

    const passCompared = comparePassword(password, user.password);
    if (!passCompared) throw { name: "Invalid email/password" };
    const token = signToken({ id: user.id });

    res.status(200).json({ access_token: `${token}` });
  } catch (error) {
    next(error);
  }
});

//google sign-in
app.post("/google-login", async (req, res, next) => {
  try {
    const { google_token } = req.headers;

    const ticket = await client.verifyIdToken({
      idToken: google_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const user = await User.findOrCreate({
      where: { email: payload.email },
      defaults: {
        fullName: payload.name,
        email: payload.email,
        password: String(Math.random() * 10000),
      },
    });

    const access_token = signToken({ id: user.id, email: user.email });
    res.status(200).json({ access_token: `${access_token}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//authentication
app.use(authentication);

//get books

app.get("/books", async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

//get book detail
app.get("/books/:id", async (req, res, next) => {
  try {
    let bookId = +req.params.id;
    let book = await Book.findByPk(bookId);
    if (!book) throw { name: "Not found" };
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

//add to my book
app.post("/mybooks/:id", async (req, res, next) => {
  try {
    let getUserId = req.user.id;
    let getBookId = +req.params.id;

    let checkBook = await Book.findByPk(getBookId);

    if (!checkBook) throw { name: "Not found" };
    let checkExistingData = await UserBookList.findOne({
      where: { UserId: getUserId, BookId: getBookId },
    });

    if (checkExistingData) throw { name: "conflict" };

    let userBook = await UserBookList.create({
      UserId: getUserId,
      BookId: getBookId,
    });

    res.status(201).json(userBook);
  } catch (error) {
    next(error);
  }
});

//get book list
app.get("/myBooks", async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const data = await UserBookList.findAll(
      { include: Book },
      { where: { UserId: userId } }
    );

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

//update my book status
app.put("/mybooks/:id", async (req, res, next) => {
  try {
    const bookId = +req.params.id;
    if (!bookId) throw { name: "Not found" };
    const data = req.body;
    const updateData = await UserBookList.update(data, {
      where: { id: bookId },
    });

    console.log(updateData);
    res.status(200).json({ message: `Book has been updated` });
  } catch (error) {
    next(error);
  }
});

//delete my book
app.delete("/myBooks/:id", async (req, res, next) => {
  try {
    const paramsId = +req.params.id;
    const userBook = await UserBookList.findByPk(paramsId);
    if (!userBook) throw { name: "Not found" };

    await userBook.destroy();
    res.status(200).json({ message: "Book has been removed" });
  } catch (error) {
    next(error);
  }
});

//AI book trivia
app.post("/book-trivia/:id", async (req, res, next) => {
  try {
    const bookId = +req.params.id;
    console.log(bookId);
    const book = await Book.findByPk(bookId);

    let respondOpenAi = await OpenAI(book.title, book.authors);

    res.send(respondOpenAi);
  } catch (error) {
    next(error);
  }
});

// //use errorhandler
app.use(errorHandler);

module.exports = app;

/*
npx sequelize model:create --name "User" --attributes name:string,email:string,password:string
npx sequelize model:create --name "Book" --attributes title:string,authors:string,publisher:string,description:string,imgUrl:string
npx sequelize model:create --name "UserBookList" --attributes rating:integer,status:string,UserId:integer,BookId:integer
npx sequelize seed:create --name "SeedUsersAdmin"

*/
// //get router
// app.use("/", router);
// const router = require("./routers/index");
