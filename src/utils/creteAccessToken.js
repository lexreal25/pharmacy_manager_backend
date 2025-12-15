import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //Extract token from header
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({
      message: "Access token invalid",
    });
  }
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({
        message: "Token expired or invalid",
      });
    }
    req.user = decodedUser;
    next();
  });
};

export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:'30m'
  });

};
