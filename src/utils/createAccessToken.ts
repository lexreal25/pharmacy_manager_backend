import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "../types/auth.types.js";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    const decodedUser = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    req.user = decodedUser;

    return next();
  } catch (error) {
    return res.status(403).json({
      message: "Token expired or invalid",
    });
  }
};

export const createAccessToken = (payload: JwtPayload) => {
  try {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "30m",
    });
  } catch (error) {
    throw new Error("Error creating access token");
  }
};

export const userProtected = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check if the user is staff/manager
  authenticateToken(req, res, () => {
    if(!req.user){
      return res.status(401).json({
        success:false,
        message:"Access denied, authentication required"
      })
    }
    const allowedRoles = ["staff","manager"];
    if(!allowedRoles.includes(req.user.role)){
      return res.status(403).json({
        success:false,
        message:"Access denied"
      })
    }
    next();
    // if (
    //   req.user.id === req.params.id &&
    //   (req.user.role === "staff" ||
    //     req.user.role === "manager" ||
    //     req.user.role === "admin")
    // ) {
    //   return next();
    // }
    // res.status(403).json({
    //   error: "Access denied, you are not authorized to perform this action",
    // });
  });
};

export const adminProtected = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check if the user is admin
  if(!req.user){
    return res.status(401).json({
      success:false,
      message:"Access denied"
    })
  }
  if(req.user.role !== "admin"){
    return res.status(403).json({
      success:false,
      message:"Admin access required"
    })
  }
  next();
  // authenticateToken(req, res, () => {
  //   if (req.user.role === "admin") {
  //     return next();
  //   }
  //   res.status(403).json({
  //     error: "Access denied, not authorized to perform this action",
  //   });
  // });
};
