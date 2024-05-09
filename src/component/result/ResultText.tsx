import { useContext, useState } from "react";
import Timer from "../timer/Timer";
import styles from "./Result.module.css";
import DataContext from "../Context";
import ShareButton from "../shareButton/ShareButton";
import RestartButton from "../RestartButton";
interface props {
  children: string;
  lose: boolean;
}
function ResultText({ children, lose }: props) {
  const { answer } = useContext(DataContext);
  const [hide, sethide] = useState(false);
  const [share, setshare] = useState(false);
  const answerString = answer.join("");

  return (
    <>
      <div className={styles.wobbleAnimation}>
        {children}
        {lose && (
          <span
            className={hide ? `${styles.show} ${styles.blur}` : styles.blur}
            onClick={() => sethide(true)}
          >
            {answerString}
          </span>
        )}
        <Timer />{" "}
      </div>
      <div className="button" style={{ display: "flex" }}>
        {lose && <RestartButton />}
        <ShareButton share={share} setshare={setshare} />
      </div>
    </>
  );
}

export default ResultText;
