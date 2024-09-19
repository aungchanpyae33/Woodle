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
  const { data, dataInput } = useContext(DataContext);

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

  let resetData = DuplicateObj(data);

  let styleArray: string[] = [];

  useEffect(() => {
    if (styleArray.length > 1) {
      dataForExitLoop.current.push(styleArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInput.length]);

  let numberOfCorrectFuture: { [key: string]: number };
  function check(index: number, innerindex: number) {
    if (innerindex === 0) {
      numberOfCorrectFuture = DuplicateObj(dataInput[index]);
    }

    if (styleArray.length === 5) {
      styleArray = [];
      resetData = DuplicateObj(data);
    }
    let blockColor = "red";
    const correctFutureWord = data.indexOf(dataInput[index][innerindex]);

    const isAnotherLetter = resetData[dataInput[index][innerindex]];

    const count =
      numberOfCorrectFuture[dataInput[index][innerindex]] > isAnotherLetter;

    if (correctFutureWord !== -1 && isAnotherLetter) {
      // if the answer is 1,2,3 , only 1,2,3 are exception from below conditional

      if (correctFutureWord > innerindex && count) {
        numberOfCorrectFuture[dataInput[index][innerindex]]--;
        blockColor = "red";
      } else {
        resetData[dataInput[index][innerindex]]--;
        if (data[innerindex] === dataInput[index][innerindex]) {
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
          data={dataInput}
          dataForExitLoop={dataForExitLoop}
          check={check}
        />
      </div>
      {children}
    </motion.div>
  );
}

export default Block;
