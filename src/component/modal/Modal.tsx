import styles from "./Modal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import DataContext from "../Context";
import { useContext } from "react";
function Modal() {
  const { open, setopen } = useContext(DataContext);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          exit={{ scale: 0 }}
          className={styles.modalBox}
        >
          <button
            onClick={() => {
              setopen(false);
            }}
          >
            Cancle
          </button>
          <p className={styles.dot}>
            <h3>If the Answer is Floor</h3>
            this is ongoing
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
