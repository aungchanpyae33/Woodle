import { useRef, useState } from "react";
import InputBox from "./component/input/InputBox";
import Block from "./component/block/Block";
import styles from "./test.module.css";
import GifResult from "./component/gif/GifResult";
import DataContext from "./component/Context";
import { fetchWord } from "./Helpers/fetchWord";
import Loader from "./component/loader/Loader";
import { useQuery } from "@tanstack/react-query";
function App() {
  const inputData = useRef(null);
  const [dataInput, setdata] = useState<string[][]>([]);
  const [result, setresult] = useState("playing");
  const [notice, setnotice] = useState("");
  const [open, setopen] = useState(false);
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: fetchWord,
  });
  if (isPending) return <Loader />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {open && (
          <div className={styles.opacity} onClick={() => setopen(false)}></div>
        )}
        <DataContext.Provider
          value={{
            dataInput,
            setdata,
            data,
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
    </div>
  );
}

export default App;
