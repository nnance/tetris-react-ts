import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowLeft,
  faArrowDown,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

const Controls: React.FC = () => (
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
);

export default Controls;
