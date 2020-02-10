import React from "react";

type StatusProps = {
  fps: number;
  level: number;
  lines: number;
};

const Status: React.FC<StatusProps> = props => (
  <div style={{ float: "right" }}>
    <table>
      <tbody>
        <tr>
          <td>
            <b>FPS:</b>
          </td>
          <td style={{ width: "30px" }}>{props.fps}</td>
        </tr>
        <tr>
          <td>
            <b>Level:</b>
          </td>
          <td>{props.level}</td>
        </tr>
        <tr>
          <td>
            <b>Lines:</b>
          </td>
          <td>{props.lines}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Status;
