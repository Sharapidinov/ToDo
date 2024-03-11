import { IColumn } from "@/store/column/columnSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { changeTaskStatus } from "@/store/task/tasksSlice";
import React, { DragEvent, useMemo, useState } from "react";
import styles from "./column.module.scss";
import { ColumnContent } from "./content";
import { ColumnFooter } from "./footer";
import { ColumnHeader } from "./header";

interface ColumnProps {
  columnData: IColumn;
}

export const Column: React.FC<ColumnProps> = ({ columnData }) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const tasks = useAppSelector((state) => state.tasks[columnData.id]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    const dropedTask = JSON.parse(e.dataTransfer.getData('application/json'));
    dispatch(changeTaskStatus({ task: dropedTask, nextColumn: columnData }));
  }

  const filteredTasks = useMemo(() => {
    return tasks?.filter((elem) => elem.title.includes(search));
  }, [search, tasks])

  return (
    <div
      data-testid="column"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={styles.column}
    >
      <ColumnHeader columnData={columnData} search={search} setSearch={setSearch} tasksLength={tasks?.length} />
      <ColumnContent tasks={filteredTasks} />
      <ColumnFooter columnData={columnData} />
    </div>
  );
};
