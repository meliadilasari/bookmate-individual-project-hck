const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let { authorization } = req.headers;
    if (!authorization) throw { name: "Invalid token" };

    const [type, token] = authorization.split(" ");
    //console.log(token);
    if (type !== "Bearer") throw { name: "Invalid token" };

    const decodedToken = verifyToken(token);
    const user = User.findByPk(decodedToken.id);

    req.user = await user;
    //console.log(req.user);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
