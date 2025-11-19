import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).send({
      status: 403,
      message: "No authorization header provided.",
    });
  }
  const token = authorization.split(" ")[1];
  if (!process.env.JWT_SECRET) {
    throw new Error("❌ DB_URL is not defined in environment variables.");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user: any) => {
    if (err) {
      return res.status(403).send({
        status: 403,
        message: "Token verification failed.",
      });
    }

    req.user = user;

    next();
  });
};

export default authMiddleware;
