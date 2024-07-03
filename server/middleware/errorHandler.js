function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json(err.errors[0].message);
      break;

    case "Password is required!":
    case "Email is required!":
      res.status(400).json(err.name);
      break;

    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      break;

    case "Invalid email/password":
    case "Invalid token":
      res.status(401).json(err.name);
      break;

    case "Not found":
      res.status(404).json({ message: "Book not found" });
      break;

    case "conflict":
      res.status(409).json({ message: "This book is already in your list!" });
      break;

    default:
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
      break;
  }
}

module.exports = errorHandler;
