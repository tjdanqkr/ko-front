import BoardList from "@/components/board/BoardList";
import { getBoard } from "api/board";
import { Page } from "types";
import { BoardResponse } from "types/board";
const initialData: Page<BoardResponse> = await getBoard(0);
const BoardPage = async () => {
  return <BoardList initialData={initialData} />;
};
export default BoardPage;
