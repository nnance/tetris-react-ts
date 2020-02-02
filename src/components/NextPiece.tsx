import React from "react";
import "./NextPiece.css";
import { GamePiece } from "../state/GamePiece";

type NextPieceProps = { piece: GamePiece };

const NextPiece: React.FC<NextPieceProps> = props => {
  return (
    <table>
      <tbody>
        {props.piece.map((row, rowIdx) => (
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
