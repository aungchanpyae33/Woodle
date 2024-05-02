import { useEffect, useState } from "react";
import styles from "./Timer.module.css";
function Timer() {
  const [count, setcount] = useState({
    hours: 23 - new Date().getHours(),
    minute: 60 - new Date().getMinutes(),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const hours = 23 - new Date().getHours();
      const minutes = 60 - new Date().getMinutes();
      // we need precount because of closure
      setcount((prevCount) => {
        // Check if the values have changed
        if (prevCount.minute !== minutes) {
          return {
            hours: hours,
            minute: minutes,
          };
        }
        return prevCount;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={styles.timer}>
      New word will reset in {""}
      {count.hours}
      {""}:{""}
      {count.minute.toString().padStart(2, "0")}
      {""}
    </div>
  );
}

export default Timer;
