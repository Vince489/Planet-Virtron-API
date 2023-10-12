const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const verifyToken = (req, res, next) => {
  // Check if the JWT token is provided in the Authorization header or cookies
  const token = req.cookies.token || req.headers.authorization;

  if (!token) return res.status(401).send("Access Denied");

  try {
    // If the token is in the Authorization header, you may need to strip the "Bearer " prefix
    const tokenWithoutPrefix = token.startsWith("Bearer ") ? token.slice(7) : token;

    const verified = jwt.verify(tokenWithoutPrefix, TOKEN_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = verifyToken;
