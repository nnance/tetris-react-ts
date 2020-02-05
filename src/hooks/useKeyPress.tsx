import React from "react";

export enum KeyCode {
  spaceBar = 32,
  leftArrow = 37,
  upArrow = 38,
  rightArrow = 39,
  downArrow = 40
}

type KeyPressProps = {
  key?: string;
  keyCode?: KeyCode;
};

export default function useKeyPress(targetKey: KeyPressProps): boolean {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = React.useState(false);

  // Add event listeners
  React.useEffect(() => {
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

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return (): void => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
