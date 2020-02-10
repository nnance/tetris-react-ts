import React from "react";
import { DrawableGrid } from "../state/DrawableGrid";
import { PieceBlock, EmptyBlock } from "./GameBoard";

type NextPieceProps = { grid: DrawableGrid };

const NextPiece: React.FC<NextPieceProps> = props => {
  return (
    <div className="col-md-4 col-4" style={{ textAlign: "left" }}>
      <div className="d-none d-md-block">
        <b>Next Piece</b>
        <br />
      </div>
      <br />
      <table>
        <tbody>
          {props.grid.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((col, idx) => (
                <td
                  key={`${rowIdx}, ${idx}`}
                  style={col ? PieceBlock : EmptyBlock}
                >
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

export default NextPiece;
