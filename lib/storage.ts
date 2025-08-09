export function saveJSON<T>(key: string, value: T) {
  try { if (typeof window === "undefined") return; localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
export function loadJSON<T>(key: string, fallback: T) {
  try { if (typeof window === "undefined") return fallback;
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}
