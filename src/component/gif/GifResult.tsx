import { useContext, useRef } from "react";
import styles from "./GifResult.module.css";
import RestartButton from "../RestartButton";
import ResultText from "../result/ResultText";
import DataContext from "../Context";

function GifResult() {
  const random = useRef<number | null>(Math.floor(Math.random() * 3));

  const { result } = useContext(DataContext);

  const loseimg = `/assets/lose0${random.current}.webp`;
  const winimg = `/assets/winning0${random.current}.webp`;
  return (
    <div
      className={result === "playing" ? styles.container : styles.showContainer}
    >
      <div className={result !== "lose" ? styles.show : styles.hide} style={{}}>
        <div
          style={{
            width: "100%",
            height: "0",
            paddingBottom: "100%",
            position: "relative",
          }}
        >
          <img
            src={loseimg}
            width="100%"
            height="100%"
            style={{ position: "absolute", objectFit: "cover" }}
            className=""
          ></img>
        </div>
        {result === "lose" && (
          <ResultText lose={true}>You Lose😥!.The answer is </ResultText>
        )}
        {result === "lose" && <RestartButton />}
      </div>

      <div className={result !== "win" ? styles.show : styles.hide} style={{}}>
        <div
          style={{
            width: "100%",
            height: "0",
            paddingBottom: "100%",
            position: "relative",
          }}
        >
          <img
            src={winimg}
            width="100%"
            height="100%"
            style={{ position: "absolute", objectFit: "cover" }}
            className=""
          ></img>
        </div>
        {result === "win" && (
          <ResultText lose={false}>You are right!.Enjoy your Day😄</ResultText>
        )}
      </div>
    </div>
  );
}

export default GifResult;
