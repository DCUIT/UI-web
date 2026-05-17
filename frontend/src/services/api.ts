const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

function normalizePath(path: string) {
  if (!path.startsWith('/')) return `/${path}`;
  return path;
}

export async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${normalizePath(path)}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}


