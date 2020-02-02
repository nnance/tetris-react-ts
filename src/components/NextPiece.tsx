import React from "react";
import "./NextPiece.css";

type GameRow = [number, number, number, number, number];
type GamePiece = [GameRow, GameRow, GameRow, GameRow];

export const StraightPiece: GamePiece = [
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0]
];

export const CubePiece: GamePiece = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0]
];

const NextPiece = (props: { piece: GamePiece }): React.ReactElement => {
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
