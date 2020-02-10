import React from "react";
import Status from "../components/Status";
import Controls from "../components/Controls";
import useFPS from "../hooks/useFPS";

type ControlProps = {
  level: number;
  lines: number;
  message?: string;
};

const ControlsContainer: React.FC<ControlProps> = props => {
  const fps = useFPS();

  return (
    <div className="col-md-4 d-none d-md-block" style={{ textAlign: "right" }}>
      <Status fps={fps} level={props.level} lines={props.lines} />
      <br />
      <br />
      <br />
      <br />
      <Controls />
      <section style={{ position: "relative", right: "20px" }}>
        {props.message}
      </section>
    </div>
  );
};

export default ControlsContainer;
