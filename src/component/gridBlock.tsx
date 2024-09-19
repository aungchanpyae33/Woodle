import styles from "./block/block.module.css";
import { memo } from "react";
import { motion } from "framer-motion";
import range from "../Helpers/RangeUnity";
interface prop {
  data: string[][];
  dataForExitLoop: React.MutableRefObject<string[][]>;
  check: (index: number, innerindex: number) => string;
}
function GridBlock({ data, dataForExitLoop, check }: prop) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.45,
        staggerChildren: 0.35,
      },
    },
  };
  const item = {
    hidden: { opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      {range(0, 5, 1).map((_, index) => (
        <motion.div
          key={crypto.randomUUID()}
          className={styles.row}
          variants={data.length - 1 === index ? container : undefined}
          initial="hidden"
          animate="visible"
        >
          {range(0, 5, 1).map((_, innerindex) => (
            <motion.div
              key={crypto.randomUUID()}
              className={styles.col}
              variants={data.length - 1 === index ? item : undefined}
            >
              {data.length > 0 && index < data.length && (
                <p
                  className={
                    dataForExitLoop.current[index]
                      ? styles[dataForExitLoop.current[index][innerindex]]
                      : styles[check(index, innerindex)]
                  }
                >
                  {data[index][innerindex]}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </>
  );
}
const MemoizedList = memo(GridBlock, (pre, next) => {
  return pre.data.length === next.data.length;
});
export default MemoizedList;
