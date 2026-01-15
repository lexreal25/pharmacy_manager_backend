import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //Extract token from header
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({
      message: "Access token missing",
    });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decodedUser;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Token expired or invalid",
    });
  }
};

export const createAccessToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
  } catch (error) {
    throw new Error("Error creating access token");
  }
};
