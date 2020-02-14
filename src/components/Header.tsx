import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type HeaderProps = {
  startHandler: () => void;
  pauseHandler: () => void;
  resumeHandler: () => void;
  isPaused: boolean;
};

const Header: React.FC<HeaderProps> = props => (
  <div id="header">
    <h3>
      Tetris React
      <a href="https://github.com/nbarkhina/TetrisJS">
        <FontAwesomeIcon
          icon={faGithub}
          style={{
            height: "25px",
            paddingBottom: "5px",
            paddingLeft: "10px"
          }}
        />
      </a>
    </h3>
    <button className="btn btn-primary" onClick={props.startHandler}>
      New Game
    </button>
    <button
      className="btn btn-primary ml-2"
      onClick={props.isPaused ? props.resumeHandler : props.pauseHandler}
    >
      {props.isPaused ? `Resume ` : `Pause`}
    </button>
    <div className="d-none d-md-block">
      <br />
    </div>
  </div>
);

export default Header;
