import { motion } from "framer-motion";
import { FaSquareShareNodes } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import styles from "../result/Result.module.css";
import React from "react";
import data from "../../Helpers/Libs/shareData";
interface props {
  share: boolean;
  setshare: React.Dispatch<React.SetStateAction<boolean>>;
}
console.log(data.Twitter);
function ShareButton({ share, setshare }: props) {
  function shareWebsite(data: string) {
    window.open(data, "_blank");
  }

  const shareVariants = {
    closed: {
      width: "fit-content",
      borderRadius: "4px",
      height: "fit-content",
      display: "flex",
      backgroundColor: "#ccc",
      justifyContent: "center",
      alignItems: "center",
      transition: {
        duration: 0.4,
      },
    },
    open: {
      width: "40%",
      height: "fit-content",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: "#ccc",
      borderRadius: "5px",
      transition: {
        duration: 0.4,
      },
    },
  };
  const iconVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
  };
  return (
    <motion.div
      className={styles.share}
      variants={shareVariants}
      animate={share ? "open" : "closed"}
      style={{ marginTop: ".5rem", marginLeft: "auto" }}
    >
      <motion.span
        className={styles.font}
        variants={iconVariants}
        style={{ width: "100%" }}
        animate="open"
      >
        {share && (
          <>
            <FaFacebook onClick={() => shareWebsite(data.facebook)} />

            <FaSquareXTwitter onClick={() => shareWebsite(data.Twitter)} />

            <FaLinkedin onClick={() => shareWebsite(data.linkedin)} />
          </>
        )}

        <FaSquareShareNodes onClick={() => setshare(!share)} />
      </motion.span>
    </motion.div>
  );
}

export default ShareButton;
