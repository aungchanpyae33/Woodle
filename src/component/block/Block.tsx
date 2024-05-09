import { ReactNode, useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./block.module.css";
import DataContext from "../Context";
import Help from "../help/Help";
import Modal from "../modal/Modal";
import MemoizedList from "../gridBlock";
interface props {
  children: ReactNode;
}
function Block({ children }: props) {
  const dataForExitLoop = useRef<string[][]>([]);
  const { answer, data } = useContext(DataContext);

  function DuplicateObj(ref: string[]) {
    const count: { [key: string]: number } = {};
    for (const value of ref) {
      if (count[value]) {
        count[value]++;
      } else {
        count[value] = 1;
      }
    }
    return count;
  }
  let resetData = DuplicateObj(answer);

  let styleArray: string[] = [];

  useEffect(() => {
    if (styleArray.length > 1) {
      dataForExitLoop.current.push(styleArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  let numberOfCorrectFuture: { [key: string]: number };
  function check(index: number, innerindex: number) {
    if (innerindex === 0) {
      numberOfCorrectFuture = DuplicateObj(data[index]);
    }

    if (styleArray.length === 5) {
      styleArray = [];
      resetData = DuplicateObj(answer);
    }
    let blockColor = "red";
    const correctFutureWord = answer.indexOf(data[index][innerindex]);

    const isAnotherLetter = resetData[data[index][innerindex]];

    const count =
      numberOfCorrectFuture[data[index][innerindex]] > isAnotherLetter;

    if (correctFutureWord !== -1 && isAnotherLetter) {
      // if the answer is 1,2,3 , only 1,2,3 are exception from below conditional

      if (correctFutureWord > innerindex && count) {
        numberOfCorrectFuture[data[index][innerindex]]--;
        blockColor = "red";
      } else {
        resetData[data[index][innerindex]]--;
        if (answer[innerindex] === data[index][innerindex]) {
          blockColor = "green";
        } else {
          blockColor = "yellow";
        }
      }
    }
    styleArray.push(blockColor);
    return blockColor;
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ scale: 0.3 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.6,
      }}
    >
      <Help />
      <div className={styles.blockContainer}>
        <Modal />
        <MemoizedList
          data={data}
          dataForExitLoop={dataForExitLoop}
          check={check}
        />
      </div>
      {children}
    </motion.div>
  );
}

export default Block;
