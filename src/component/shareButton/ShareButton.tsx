import { animate, motion, stagger } from "framer-motion";
import { FaSquareShareNodes } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import styles from "../result/Result.module.css";
import { useEffect } from "react";
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

  useEffect(() => {
    animate(
      ".hi",

      share
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: stagger(0.3),
      }
    );
  }, [share]);
  return (
    <motion.ul
      whileTap={{ scale: 0.95, boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)" }}
      className={styles.share}
      data-isshare={share}
      style={{ marginTop: ".5rem", marginLeft: "auto" }}
    >
      <li style={{ display: `${share ? "flex" : "none"}` }} className="hi">
        <FaFacebook onClick={() => shareWebsite(data.facebook)} />
      </li>
      <li style={{ display: `${share ? "flex" : "none"}` }} className="hi">
        <FaSquareXTwitter onClick={() => shareWebsite(data.Twitter)} />
      </li>
      <li style={{ display: `${share ? "flex" : "none"}` }} className="hi">
        <FaLinkedin onClick={() => shareWebsite(data.linkedin)} />
      </li>
      <li style={{ display: "flex" }}>
        <FaSquareShareNodes onClick={() => setshare(!share)} />
      </li>
    </motion.ul>
  );
}

export default ShareButton;
