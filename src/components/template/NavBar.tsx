"use client";

import { tokenRefresh } from "api/auth";
import { loginUtility, logoutUtility } from "lib/authStorage";
import { ONE_MINUTE } from "lib/time";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const silentRefresh = async () => {
  const response = await tokenRefresh();
  if (response) {
    loginUtility(response);
  }
};
const NavBar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!window.localStorage.getItem("accessToken"));
      const expiresIn = window.localStorage.getItem("expiresIn");
      if (expiresIn && new Date(expiresIn).getTime() - 60 * ONE_MINUTE < new Date().getTime()) {
        silentRefresh();
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      logoutUtility();
      setIsLoggedIn(false);
    }
  };

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl mx-auto pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-2xl font-bold">MyApp</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === "/" ? "border-b-2 border-indigo-500" : ""}`}>
                Home
              </Link>
              <Link href="/board" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === "/board" ? "border-b-2 border-indigo-500" : ""}`}>
                Board
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex items-center px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded hover:bg-red-400 transition">
                로그아웃
              </button>
            ) : (
              <Link href="/login" className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-400 transition">
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
