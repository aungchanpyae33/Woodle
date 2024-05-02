import { useEffect, useRef, useState } from "react";
import InputBox from "./component/input/InputBox";
import Block from "./component/block/Block";
import styles from "./test.module.css";
import GifResult from "./component/gif/GifResult";
import DataContext from "./component/Context";
import { fetchWord } from "./Helpers/fetchWord";
import Loader from "./component/loader/Loader";

function App() {
  const inputData = useRef(null);
  const [answer, setanswer] = useState<string[]>([]);
  const [data, setdata] = useState<string[][]>([]);
  const [result, setresult] = useState("playing");
  const [notice, setnotice] = useState("");
  const [open, setopen] = useState(false);

  useEffect(() => {
    async function getAnswer() {
      const data = await fetchWord();
      setanswer(data);
    }
    getAnswer();
  }, []);
  return (
    <div className={styles.app}>
      {answer.length === 0 ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          {open && (
            <div
              className={styles.opacity}
              onClick={() => setopen(false)}
            ></div>
          )}
          <DataContext.Provider
            value={{
              data,
              setdata,
              answer,
              inputData,
              notice,
              setnotice,
              result,
              setresult,
              open,
              setopen,
            }}
          >
            {result === "playing" && (
              <Block>
                <InputBox />
              </Block>
            )}

            <GifResult />
          </DataContext.Provider>
        </div>
      )}
    </div>
  );
}

export default App;
