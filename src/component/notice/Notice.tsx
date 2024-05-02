import styles from "./Notice.module.css";
interface props {
  children: string;
}
function Notice({ children }: props) {
  return <div className={styles.notice}>{children}</div>;
}

export default Notice;
