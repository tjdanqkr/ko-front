"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  if (error.message === "다시 로그인 해주세요.") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-4">로그인 만료</h2>
        <p className="text-gray-600 mb-4">다시 로그인 해주세요.</p>
        <Link href={"/login"} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          로그인 페이지로 이동
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-red-600 mb-4">문제가 발생했습니다!</h2>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => reset()}>
        다시 시도하기
      </button>
    </div>
  );
}
