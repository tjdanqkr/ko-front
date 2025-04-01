import { cookies } from "next/headers";

type Method = "GET" | "POST" | "PUT" | "DELETE";
export const api = async (url: string, method: Method, data?: any, headers?: any) => {
  const baseURL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8080" : location.origin;

  // const token = (await cookies()).get("token");
  // const header = headers && token && { Authorization: `Bearer ${token}`, ...headers };
  // console.log(`${baseURL}/${url}`);
  const response = await fetch(`${baseURL}/${url}`, {
    body: data ? JSON.stringify(data) : undefined,
    method,
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      // ...header,
    },
  }).catch((e) => {
    console.error(e);
    throw new Error("Network error");
  });
  if (response.status >= 400) throw new Error(response.statusText);
  return await response.json();
};
