import React from "react";
import "./GameBoard.css";

type BoardBlock = number;
type BoardRow = [
  BoardBlock,
  BoardBlock,
  BoardBlock,
  BoardBlock,
  BoardBlock,
  BoardBlock,
  BoardBlock,
  BoardBlock,
  BoardBlock,
  BoardBlock
];
type Board = [
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow
];

const GameBoard: React.FC = () => {
  const board = Array(20).fill(Array(10).fill(0) as BoardRow) as Board;
  return (
    <div className="col-md-4 col-8">
      <table className="GameBoard">
        <tbody>
          {board.map((row, rowIdx) => (
            <tr key={`${row}-${rowIdx}`}>
              {row.map((block, idx) => (
                <td key={idx} className={block ? "PieceBlock" : "EmptyBlock"}>
                  {" "}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameBoard;
