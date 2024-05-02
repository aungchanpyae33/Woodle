import { useContext } from "react";
import styles from "./RestartButton.module.css";
import DataContext from "./Context";
function RestartButton() {
  const { setdata, setresult, inputData } = useContext(DataContext);
  function restart() {
    if (inputData.current) {
      inputData.current.value = "";
    }
    setdata([]);
    setresult("playing");
  }
  return (
    <button onClick={restart} className={styles.restartButton}>
      Restart
    </button>
  );
}

export default RestartButton;
