const configuredSecret = process.env.SESSION_SECRET;
if (!configuredSecret || configuredSecret.length < 32) {
  throw new Error("SESSION_SECRET must contain at least 32 characters.");
}
export const adminSecret = new TextEncoder().encode(configuredSecret);

