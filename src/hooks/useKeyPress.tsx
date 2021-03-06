import React from "react";

type KeyPressProps = {
  key?: string;
  keyCode?: number;
};

export default function useKeyPress(targetKey: KeyPressProps): boolean {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = React.useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key, keyCode }: KeyboardEvent): void {
    if (targetKey.key && key === targetKey.key) {
      setKeyPressed(true);
    } else if (targetKey.keyCode && keyCode === targetKey.keyCode) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key, keyCode }: KeyboardEvent): void => {
    if (targetKey.key && key === targetKey.key) {
      setKeyPressed(false);
    } else if (targetKey.keyCode && keyCode === targetKey.keyCode) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return (): void => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
