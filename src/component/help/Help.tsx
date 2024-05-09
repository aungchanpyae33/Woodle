import styles from "./Help.module.css";
import DataContext from "../Context";
import { useContext } from "react";
import { motion } from "framer-motion";
function Help() {
  const text = "Woodle".split("");
  const { setopen } = useContext(DataContext);
  return (
    <div className={styles.help}>
      <div className={styles.text}>
        {text.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: i / 3,
            }}
            key={i}
          >
            {el}{" "}
          </motion.span>
        ))}
      </div>
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
