import { BoardResponse } from "types/board";
type Props = {
  board: BoardResponse;
};

const Board = ({ board }: Props) => {
  return (
    <div className="p-5 mb-5 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="mb-2 text-xl font-semibold text-gray-800">{board.name}</h2>
      <p className="text-gray-600">{board.description}</p>
    </div>
  );
};
export default Board;
