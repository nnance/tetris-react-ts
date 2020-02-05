import React from "react";
import "./GameBoard.css";
import { DrawableGrid } from "../state/DrawableGrid";

type GameBoardProps = {
  board: DrawableGrid;
}

const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
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
