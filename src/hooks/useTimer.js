import { useState, useEffect } from "react";

export const useTimer = (_minutes) => {
  const [timer, setTimer] = useState("");
  let interval_id;
  let seconds = _minutes * 60 + 1;

  useEffect(() => {
    interval_id = setInterval(countDown, 1000);
    return () => {
      clearInterval(interval_id);
    };
  }, []);

  const countDown = () => {
    if (seconds <= 0) {
      clearInterval(interval_id);
      setTimer("Times up");
    } else {
      seconds--;
      calculateTimer();
    }
  };

  const calculateTimer = () => {
    let secondsStr = String(seconds % 60).padStart(2, "0");
    let minutesStr = String(Math.floor(seconds / 60)).padStart(2, "0");
    setTimer(minutesStr + ":" + secondsStr);
  };

  return [timer];
};
