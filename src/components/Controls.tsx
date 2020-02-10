import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowLeft,
  faArrowDown,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

type ControlProps = {
  fps: number;
  level: number;
  lines: number;
  message?: string;
};

const Controls: React.FC<ControlProps> = props => (
  <div className="col-md-4 d-none d-md-block" style={{ textAlign: "right" }}>
    <b>FPS:</b> <span>{props.fps}</span>
    <br />
    <b>Level:</b>
    {props.level}
    <br />
    <b>Lines:</b>
    {props.lines}
    <br />
    <br />
    <br />
    <br />
    <div style={{ float: "right" }}>
      <table style={{ textAlign: "center" }}>
        <tbody>
          <tr>
            <td>
              <FontAwesomeIcon icon={faArrowUp} />
            </td>
            <td>
              <div style={{ width: "20px" }}></div>
            </td>
            <td>Rotate</td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon icon={faArrowLeft} />
              &nbsp;
              <FontAwesomeIcon icon={faArrowDown} />
              &nbsp;
              <FontAwesomeIcon icon={faArrowRight} />
            </td>
            <td></td>
            <td>Move</td>
          </tr>
          <tr>
            <td>
              <b>A</b>
            </td>
            <td></td>
            <td>Drop</td>
          </tr>
          <tr>
            <td>
              <b>P</b>
            </td>
            <td></td>
            <td>Pause</td>
          </tr>
          <tr>
            <td>
              <b>N</b>
            </td>
            <td></td>
            <td>New Game</td>
          </tr>
        </tbody>
      </table>
    </div>
    <section style={{ position: "relative", right: "20px" }}>
      {props.message}
    </section>
  </div>
);

export default Controls;
