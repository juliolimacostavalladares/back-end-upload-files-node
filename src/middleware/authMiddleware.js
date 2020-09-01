const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).send({ error: "No token provided" });
  }
  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).send({ error: "token error" });
  }

  const [scheme, token] = parts;

  if (!/^Baerer$/.test(scheme)) {
    return res.status(401).send({ error: "Token malformatted" });
  }

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Token invalid" });
    }

    req.useID = decoded.id;

    return next();
  });
};
