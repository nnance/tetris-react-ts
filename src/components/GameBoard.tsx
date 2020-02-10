import React from "react";
import { DrawableGrid } from "../state/DrawableGrid";

type GameBoardProps = {
  board: DrawableGrid;
};

export const PieceBlock = {
  width: "20px",
  height: "20px",
  backgroundColor: "blue",
  border: "1px solid black",
  fontSize: "0.75rem"
};

export const EmptyBlock = {
  width: "20px",
  height: "20px",
  backgroundColor: "white",
  border: "1px solid black",
  fontSize: "0.75rem"
};

const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  return (
    <div className="col-md-4 col-8">
      <table style={{ margin: "0px auto" }}>
        <tbody>
          {board.map((row, rowIdx) => (
            <tr key={`${row}-${rowIdx}`}>
              {row.map((block, idx) => (
                <td key={idx} style={block ? PieceBlock : EmptyBlock}>
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
