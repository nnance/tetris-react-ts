import React from "react";
import "./Controls.css";
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
};

const Controls: React.FC<ControlProps> = props => (
  <div className="col-md-4 d-none d-md-block Col">
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
    <div className="MoveCol">
      <table className="MoveTable">
        <tbody>
          <tr>
            <td>
              <FontAwesomeIcon icon={faArrowUp} />
            </td>
            <td>
              <div className="RotationCol"></div>
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
    <section className="MessageCol" rv-html="data.message"></section>
  </div>
);

export default Controls;
