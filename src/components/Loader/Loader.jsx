import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
}

export default Loader;
