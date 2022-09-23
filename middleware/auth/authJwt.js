import jwt from "jsonwebtoken";
import config from "../../config/auth.config";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(400).send({
      message: "No token is provided",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized access",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
