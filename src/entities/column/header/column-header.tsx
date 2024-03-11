import { useOnClickOutside } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { IColumn } from "@/store/column/columnSlice";
import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./column-header.module.scss";

interface ColumnHeaderProps {
  columnData: IColumn;
  tasksLength: number;
  setSearch: (value: string | ((value: string) => string)) => void;
  search: string
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ columnData, tasksLength, setSearch, search }) => {
  const [searchInputOpen, setSearchInputOpen] = useState(false);
  const searchRef = useRef(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const toggleInput = () => {
    setSearch("");
    setSearchInputOpen(!searchInputOpen)
  }

  useOnClickOutside(searchRef, toggleInput)
  return (
    <div className={styles.header} data-testid="column-header">
      {!searchInputOpen &&
        <p
          className={styles.title}>
          {columnData.title}
          ({!!tasksLength? `${tasksLength}`:0})
        </p>}
      {searchInputOpen &&
        <input
          value={search}
          ref={searchRef}
          onChange={handleChange}
          placeholder={"search"}
          className={styles.search_input}
        />}

      <Button type={"secondary"} className={styles.search_button} data-testid="toggle-search-input" onClick={toggleInput}>
        <svg width="24" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#172b4d" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 22L20 20" stroke="#172b4d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>
    </div>
  );
};
