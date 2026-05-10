import { type Request, type Response, type NextFunction } from "express";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET ?? "fallback-secret-change-me");

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    await jwtVerify(auth.slice(7), secret);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
