import React from 'react';
import Button from '../../shared/Button/Button';
import styles from './DeleteAccount.module.css';

const DeleteAccountModal = ({ onModalClose, onDeleteAccount, loading }) => {
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <img
          src="/images/x.svg"
          alt="close icon"
          id={styles.closeButton}
          onClick={onModalClose}
        />
        <h1 className={styles.modalHeadingText}>DELETE ACCOUNT</h1>
        <p className={styles.disclaimer}>
          This process is irreversible. Once you delete your account you cannot
          get it back. So proceed with caution.
        </p>
        <div className={styles.actions}>
          <Button
            text="Understood"
            disabled={loading}
            onClick={onModalClose}
            icon=""
            style={{ marginRight: '7px', backgroundColor: 'var(--blue)' }}
          />
          <Button
            text="Just Delete"
            disabled={loading}
            onClick={onDeleteAccount}
            icon=""
            style={{ backgroundColor: 'var(--danger)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
