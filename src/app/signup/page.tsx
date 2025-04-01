"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "api/auth";
import { UserRequest } from "types/user";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const request: UserRequest = { name, email, password };

    try {
      const response = await signup(request);
      console.log("회원가입 응답", response);
      if (!response) {
        throw new Error("회원가입에 실패했습니다.");
      }
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded shadow bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">회원가입</h2>
        {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-gray-800">
            이름
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-800 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-gray-800">
            이메일
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-800 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-gray-800">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-800 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">
          회원가입
        </button>
        <button type="button" onClick={() => router.push("/login")} className="w-full mt-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition">
          로그인 페이지로 이동
        </button>
      </form>
    </div>
  );
}
