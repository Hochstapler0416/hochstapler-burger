export const API_BASE = "";

export function apiUrl(path: string) {
  return `${API_BASE}${path}`;
}