import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

function ImageModal({ data, onClose }) {
  const { urls, alt_description, user, likes, description } = data;

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.closeBtn} onClick={onClose}>
        ×
      </button>
      <img src={urls.regular} alt={alt_description} className={styles.image} />
      <div className={styles.info}>
        {description && (
          <p>
            <strong>Description:</strong> {description}
          </p>
        )}
        <p>
          <strong>Author:</strong> {user.name}
        </p>
        <p>
          <strong>Likes:</strong> {likes}
        </p>
      </div>
    </ReactModal>
  );
}

export default ImageModal;
