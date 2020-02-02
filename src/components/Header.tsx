import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Header: React.FC<{}> = () => (
  <div id="header">
    <h3>
      Tetris React
      <a href="https://github.com/nbarkhina/TetrisJS">
        <FontAwesomeIcon icon={faGithub} className="Logo" />
      </a>
    </h3>
    <button className="btn btn-primary">New Game</button>
    <button
      className="btn btn-primary ml-2"
      rv-text="data.getPauseButtonText | call data.game_mode"
    >
      Pause
    </button>
    <br />
    <div className="d-md-none">
      <b>FPS:</b> <span rv-text="data.currentfps">60</span>
      <b>Level:</b> 0 <b>Lines:</b> 0
    </div>
    <div className="d-none d-md-block">
      <br />
    </div>
  </div>
);

export default Header;
