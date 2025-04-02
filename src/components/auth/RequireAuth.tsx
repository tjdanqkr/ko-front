"use client";

import { getMe } from "api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RequireAuthProps {
  children: React.ReactNode;
}
const isLoggedIn = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return false;

  try {
    await getMe();
    return true;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
};
const RequireAuth = ({ children }: RequireAuthProps) => {
  const router = useRouter();
  const checkLogin = async () => {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
      router.replace(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`);
    }
  };
  useEffect(() => {
    checkLogin();
  }, [router]);

  return <>{children}</>;
};

export default RequireAuth;
