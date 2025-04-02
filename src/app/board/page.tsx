import BoardList from "@/components/board/BoardList";
import { getBoard } from "api/board";
import Link from "next/link";
import { Page } from "types";
import { BoardResponse } from "types/board";
const initialData: Page<BoardResponse> = await getBoard(0);
const BoardPage = async () => {
  return (
    <main className="p-5 w-full">
      <header className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">Board</h1>
        <Link href="/board/write" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          글쓰기
        </Link>
      </header>
      <BoardList initialData={initialData} />
    </main>
  );
};
export default BoardPage;
