"use client";
import { useEffect, useRef, useState } from "react";
import { BoardResponse } from "types/board";
import Board from "./Board";
import { getBoard } from "api/board";
import { Page } from "types";

const BoardList = ({ initialData }: { initialData: Page<BoardResponse> }) => {
  const [data, setData] = useState<BoardResponse[]>(initialData.content);
  const [page, setPage] = useState(initialData.number + 1);
  const [hasMore, setHasMore] = useState(!initialData.last);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const fetchData = async () => {
    const response: Page<BoardResponse> = await getBoard(page);
    setData((prevData) => [...prevData, ...response.content]);
    setHasMore(!response.last);
  };
  useEffect(() => {
    if (page !== 1) fetchData();
  }, [page]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, data]);

  return (
    <div className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((board, index) => {
        if (index === data.length - 1) {
          return (
            <div key={board.id} ref={lastElementRef}>
              <Board board={board} />
            </div>
          );
        } else {
          return <Board board={board} key={board.id} />;
        }
      })}
    </div>
  );
};

export default BoardList;
