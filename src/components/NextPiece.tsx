import React from "react";
import "./NextPiece.css";
import { DrawableGrid } from "../state/DrawableGrid";

type NextPieceProps = { grid: DrawableGrid };

const NextPiece: React.FC<NextPieceProps> = props => {
  return (
    <table>
      <tbody>
        {props.grid.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((col, idx) => (
              <td
                key={`${rowIdx}, ${idx}`}
                className={col ? "PieceBlock" : "EmptyBlock"}
              >
                {" "}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NextPiece;
