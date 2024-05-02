import styles from "./Help.module.css";
import DataContext from "../Context";
import { useContext } from "react";

function Help() {
  const { setopen } = useContext(DataContext);
  return (
    <div className={styles.help}>
      <h1>Woodle</h1>
      <img
        src="/question-mark(1).png"
        alt=""
        onClick={() => {
          setopen((pre) => !pre);
        }}
      />
    </div>
  );
}

export default Help;
