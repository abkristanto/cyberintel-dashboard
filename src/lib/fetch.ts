const API_BASE = import.meta.env.VITE_API_BASE as string;

export async function apiGet<T>(path: string, params?: Record<string, any>): Promise<T> {
  const url = new URL(path, API_BASE);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const res = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.json() as Promise<T>;
}
