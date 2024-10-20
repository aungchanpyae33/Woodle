import { useContext, useState } from "react";

import styles from "./InputBox.module.css";
import Keybord from "../keyboard/Keybord";
import ReactMdSize from "../../Helpers/ReactMdsize";
import Notice from "../notice/Notice";
import DataContext from "../Context";
import DataCo from "../Contextkeyboard";
import stylesloader from "../loader/Loader.module.css";

function InputBox() {
  const { data, dataInput, setdata, inputData, setresult } =
    useContext(DataContext);

  const [focus, setfocus] = useState<boolean>(false);
  const [isPending, setIsPending] = useState(false);
  const [keyboard, setkeyboard] = useState("");
  const [notice, setnotice] = useState("");
  const [wrongData, setwrongData] = useState<string[]>([]);
  const isSmall = ReactMdSize();

  function isNotInTheWord(ArrayData: string[]) {
    console.log(wrongData);
    const notInTheWords = ArrayData.filter((item) => wrongData.includes(item));
    if (notInTheWords.length !== 0) {
      const RemoveDuplicatValue = [...new Set(notInTheWords)];
      const noticWrong = RemoveDuplicatValue.join(",");
      const isAre = noticWrong.length > 1 ? "are" : "is";
      setnotice(`Hey! ${noticWrong} ${isAre} not in the Word!🤫`);
      return true;
    }
  }
  function CollectWrongData(ArrayData: string[], inputValue: string) {
    const WrongAnswer = ArrayData.filter((item) => !data.includes(item));

    const Wrong = wrongData.concat(WrongAnswer);
    setwrongData(Wrong);

    const v = dataInput.map((item) => [item.join("")]);
    const isAlreday = v.flat().includes(inputValue);
    if (isAlreday) {
      setnotice(`Hey! ${inputValue} is already typed!😒`);
      return true;
    }
  }
  function CheckResult(inputValue: string) {
    const Answer = data.join("");
    if (inputValue == Answer) {
      setTimeout(() => {
        setresult("win");
      }, 2000);
    } else if (dataInput.length + 1 > 4) {
      setTimeout(() => {
        setresult("lose");
      }, 2000);
    }
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const inputValue = inputData.current?.value.toUpperCase();

        if (inputValue?.length !== 5) {
          setnotice("Hey! i need 5 letters😐");
          return;
        }
        console.log(inputValue, "iv");
        const ArrayData = inputValue?.split("");
        console.log(ArrayData, "ad");
        if (dataInput.length > 0) {
          console.log(data);
          if (CollectWrongData(ArrayData, inputValue)) {
            return;
          }
          if (wrongData.length !== 0) {
            if (isNotInTheWord(ArrayData)) {
              return;
            }
          }
        }

        async function check() {
          setIsPending(true);
          await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue!}`
          ).then((response) => {
            setIsPending(false);
            if (response.status === 200) {
              console.log("nice");
              const newData = [...dataInput, ArrayData || []];
              setdata(newData);
              CheckResult(inputValue!);
            } else {
              setnotice("Hey! this letter is not valid.😐");
            }
          });
        }
        await check();
        if (inputData.current) {
          inputData.current.value = "";
          inputData.current.focus();
        }
        setkeyboard("");
      }}
    >
      {isSmall && (
        <>
          <DataCo.Provider
            value={{
              keyboard,
              setkeyboard,
              setnotice,
            }}
          >
            <div className={styles.inputContainer}>
              <input
                type="text"
                ref={inputData}
                readOnly
                lang="en"
                spellCheck="true"
                value={keyboard}
                onClick={() => {
                  setfocus(!focus);
                }}
                className={styles.inputWidth}
              />

              {isPending && <div className={stylesloader.loaderCheck}></div>}

              {notice && <Notice>{notice}</Notice>}
            </div>
            <Keybord focus={focus} setfocus={setfocus} />
          </DataCo.Provider>
        </>
      )}
      {!isSmall && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            ref={inputData}
            value={keyboard}
            lang="en"
            spellCheck="true"
            onFocus={(e) => {
              console.log(e.currentTarget.spellcheck);
            }}
            //set for to access the data for keyboard
            // pattern="[a-zA-Z]{5}"
            className={styles.inputWidth}
            onChange={(e) => {
              setnotice("");
              const OnlyAlphabet = e.target.value
                .replace(/[^a-zA-Z]/g, "")
                .toUpperCase();
              const limitFive = OnlyAlphabet.slice(0, 5);
              setkeyboard(limitFive);
            }}
          />

          {isPending && <div className={stylesloader.loaderCheck}></div>}

          {notice && <Notice>{notice}</Notice>}
        </div>
      )}
    </form>
  );
}

export default InputBox;
