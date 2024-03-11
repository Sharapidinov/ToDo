import { ColumnForm } from "@/features/create-column";
import { Modal } from "@/shared/ui";
import React, { useState } from "react";
import styles from "./column-create.module.scss";

interface CreateColumnProps {
}

export const CreateColumn: React.FC<CreateColumnProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className={styles.create_column} data-testid="create-column-btn" onClick={onToggleModal}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12H18" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 18V6" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Добавить ещё одну колонку</span>
      </div>
      {
        isOpen &&
        <Modal onClose={onToggleModal}>
          <ColumnForm onClose={onToggleModal} />
        </Modal>
      }
    </>
  );
};
