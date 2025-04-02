"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { BoardResponse } from "types/board";
import Board from "./Board";
import { getBoard } from "api/board";
import { Page } from "types";

interface BoardListProps {
  initialData: Page<BoardResponse>;
}

const BoardList = ({ initialData }: BoardListProps) => {
  console.log("initialData", initialData);
  const [boards, setBoards] = useState<BoardResponse[]>(initialData.content);
  const [currentPage, setCurrentPage] = useState<number>(initialData.page.number);
  const [hasMore, setHasMore] = useState<boolean>(initialData.page.totalPages > initialData.page.number);
  const [fetchedPages] = useState<Set<number>>(new Set([initialData.page.number]));

  const observer = useRef<IntersectionObserver | null>(null);

  const fetchData = useCallback(
    async (pageNumber: number) => {
      if (!hasMore || fetchedPages.has(pageNumber)) return;

      try {
        const response = await getBoard(pageNumber);
        if (response.content.length > 0) {
          setBoards((prevBoards) => [...prevBoards, ...response.content]);
          setHasMore(!response.page.last);
          fetchedPages.add(pageNumber);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
        setHasMore(false);
      }
    },
    [fetchedPages, hasMore]
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      if (node && hasMore) {
        observer.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasMore) {
              const nextPage = currentPage + 1;
              if (!fetchedPages.has(nextPage)) {
                setCurrentPage(nextPage);
              }
            }
          },
          {
            root: null,
            rootMargin: "100px",
            threshold: 0.1,
          }
        );

        observer.current.observe(node);
      }
    },
    [hasMore, currentPage, fetchedPages]
  );

  return (
    <div className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {boards.length === 0 ? (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">게시물이 없습니다.</p>
        </div>
      ) : (
        boards.map((board, index) => {
          const isLastElement = index === boards.length - 1;

          return (
            <div key={board.id} ref={isLastElement ? lastElementRef : null} className="border p-4 rounded-lg shadow bg-white transition-shadow hover:shadow-md">
              <Board board={board} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default BoardList;
