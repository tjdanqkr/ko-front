type Method = "GET" | "POST" | "PUT" | "DELETE";
export const api = async (url: string, method: Method, data?: any, headers?: any) => {
  const baseURL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8080" : location.origin;
  // TODO: 토큰 방식으로 바꿀 것
  let accessToken: string | null = null;
  let refreshToken: string | null = null;
  if (typeof window !== "undefined") {
    accessToken = window.localStorage.getItem("accessToken");
    refreshToken = window.localStorage.getItem("refreshToken");
  }
  if (accessToken && refreshToken) {
    const tokenHeader = { Authorization: `Bearer ${accessToken}`, "Refresh-Token": `${refreshToken}` };
    headers = headers ? { ...headers, ...tokenHeader } : tokenHeader;
  }
  const response = await fetch(`${baseURL}/${url}`, {
    body: data ? JSON.stringify(data) : undefined,
    method,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  }).catch((e) => {
    console.error(e);
    throw new Error("Network error");
  });
  if (response.status === 400) {
    const json = await response.json();
    throw new Error(json.error || "Bad Request");
  }
  if (response.status > 400) throw new Error(response.statusText);
  if (response.status === 201 || response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};
