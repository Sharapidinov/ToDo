import React, { useRef } from "react";
import { useOnClickOutside } from "../../lib";
import styles from "./modal.module.scss";

interface IModal {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = (props: IModal) => {
  const contentRef = useRef(null);
  useOnClickOutside(contentRef, props.onClose);

  return (
    <div className={styles.backdrop} data-testid="backdrop">
      <div className={styles.content} ref={contentRef}>
        {props.children}
      </div>
    </div>
  );
};