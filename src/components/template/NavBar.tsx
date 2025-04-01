"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

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
            <Link href="/login" className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-400 transition">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
