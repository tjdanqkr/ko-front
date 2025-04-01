const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="gap-8 row-start-2 sm:items-start w-full">
      <section>
        <h1 className="text-4xl font-bold mb-5">Board</h1>
        {children}
      </section>
    </main>
  );
};
export default BoardLayout;
