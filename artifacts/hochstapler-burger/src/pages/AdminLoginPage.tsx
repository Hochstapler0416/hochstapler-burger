import { apiUrl } from "@/lib/api";
import { useState } from "react";
import { useLocation } from "wouter";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(apiUrl("/api/admin/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json() as { token?: string; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Anmeldung fehlgeschlagen");
      } else if (data.token) {
        localStorage.setItem("admin_token", data.token);
        navigate("/admin/dashboard");
      }
    } catch {
      setError("Server nicht erreichbar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="https://hochstapler-burger.de/wp-content/uploads/2021/04/Logo_sticky.png"
            alt="Hochstapler Burger"
            className="h-16 w-auto mx-auto mb-6 brightness-0 invert"
          />
          <h1 className="font-serif text-2xl text-background">
            Mitarbeiter-Bereich
          </h1>
          <p className="text-primary-foreground/60 text-sm mt-1">
            Melde dich an um die Karte zu bearbeiten
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-background p-8">
          <label className="block text-sm font-semibold uppercase tracking-wider text-primary mb-2">
            Passwort
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-border px-4 py-3 text-primary bg-background focus:outline-none focus:border-accent mb-4"
            placeholder="Passwort eingeben"
            autoFocus
          />

          {error && (
            <p className="text-coral text-sm mb-4 font-semibold">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-accent text-primary font-bold py-3 uppercase tracking-wider hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Anmeldung..." : "Anmelden"}
          </button>
        </form>

        <p className="text-primary-foreground/40 text-xs text-center mt-4">
          Nur für Mitarbeiter des Hochstapler Burger
        </p>
      </div>
    </div>
  );
}