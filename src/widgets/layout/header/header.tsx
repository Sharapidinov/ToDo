import { useOnClickOutside } from "@/shared/lib";
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./header.module.scss";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const [newTitle, setNewTitle] = useState("You can change title");
  const [visible, setVisible] = useState(false);
  const titleInput = useRef<HTMLInputElement>(null);

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setVisible(!visible);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
  }

  const handleClick = () => {
    setVisible(!visible);
  }

  useEffect(() => {
    if (visible && titleInput.current) {
      titleInput.current.focus();
      titleInput.current.select();
    }
  }, [visible])

  useOnClickOutside(titleInput, () => setVisible(!visible))
  return (
    <div className={styles.wrapper}>
      {!visible && <h1 className={styles.title} onClick={handleClick}>{newTitle}</h1>}
      {visible &&
        <input
          ref={titleInput}
          name={"new-project-title"}
          value={newTitle}
          onChange={handleChange}
          placeholder="New Title"
          className={styles.input}
          onKeyPress={handleKeyPress} />}
    </div>
  );
};
