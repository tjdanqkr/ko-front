"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import BoardWriteForm from "@/components/board/BoardWriteForm";

export default function BoardWritePage() {
  return (
    <RequireAuth>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">새 글 작성</h1>
        <BoardWriteForm />
      </div>
    </RequireAuth>
  );
}
