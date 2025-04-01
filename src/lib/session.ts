import "server-only";
import { cookies } from "next/headers";

export async function createSession(userId: string, token: string) {
  (await cookies()).set(userId, token);
}
export async function getSession(userId: string) {
  return (await cookies()).get(userId);
}
