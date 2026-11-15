import type { RequestHandler } from "express";

// A single Render instance is used. A shared limiter is needed before scaling.
export function rateLimit(limit: number, windowMs: number): RequestHandler {
  const windows = new Map<string, { count: number; expires: number }>();
  return (req, res, next) => {
    const now = Date.now();
    for (const [key, value] of windows) {
      if (value.expires <= now) windows.delete(key);
    }
    const key = req.ip ?? "unknown";
    let entry = windows.get(key);
    if (!entry) {
      if (windows.size >= 10000) {
        res.status(429).json({ error: "Bitte später erneut versuchen." });
        return;
      }
      entry = { count: 0, expires: now + windowMs };
      windows.set(key, entry);
    }
    entry.count += 1;
    if (entry.count > limit) {
      res.setHeader("Retry-After", String(Math.ceil((entry.expires - now) / 1000)));
      res.status(429).json({ error: "Zu viele Anfragen. Bitte später erneut versuchen." });
      return;
    }
    next();
  };
}

