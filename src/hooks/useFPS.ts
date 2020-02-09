import React from "react";

const useFPS = (): number => {
  const [times, setTimes] = React.useState<number[]>([]);

  React.useEffect(() => {
    const refreshLoop = (): void => {
      window.requestAnimationFrame(() => {
        const now = performance.now();
        setTimes(state => {
          const times = [...state];
          while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
          }
          times.push(now);
          return times;
        });
        refreshLoop();
      });
    };
    refreshLoop();
  }, [setTimes]);

  return times.length;
};

export default useFPS;
