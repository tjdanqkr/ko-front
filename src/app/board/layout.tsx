import Link from "next/link";

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="p-5 w-full">
      <header className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">Board</h1>
        <Link href="/board/write" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          글쓰기
        </Link>
      </header>
      <section>{children}</section>
    </main>
  );
};

export default BoardLayout;
