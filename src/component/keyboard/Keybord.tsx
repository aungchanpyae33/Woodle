import { useContext } from "react";
import styles from "./Keyboard.module.css";
import range from "../../Helpers/RangeUnity";
import DataCo from "../Contextkeyboard";
interface prop {
  focus: boolean;
  setfocus: React.Dispatch<boolean>;
}
function Keybord({ focus, setfocus }: prop) {
  const alphabetArray = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Delete", "Z", "X", "C", "V", "B", "N", "M", "Enter"],
  ];
  const { keyboard, setkeyboard, setnotice } = useContext(DataCo);
  function click(item: string) {
    setkeyboard(item);
  }
  return (
    <div
      className={
        focus ? `${styles.keyboard1} ${styles.point}` : styles.keyboard1
      }
    >
      {range(0, 3, 1).map((_, index) => (
        <div className={styles.row} key={crypto.randomUUID()}>
          {alphabetArray[index].map((item) => (
            <button
              key={crypto.randomUUID()}
              className={`${styles.cell}`}
              onClick={(e) => {
                setfocus(false);
                if (item !== "Enter") {
                  e.preventDefault();
                  setnotice("");
                }
                if (item.length > 1) {
                  if (item === "Delete") {
                    const DeleteLastString = keyboard.length - 1;
                    console.log(DeleteLastString);
                    const DeleteString = keyboard.slice(0, DeleteLastString);
                    setkeyboard(DeleteString);
                  }
                } else {
                  if (keyboard.length < 5) {
                    const plusString = keyboard + item;
                    click(plusString);
                  }
                }
              }}
            >
              {item}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keybord;
