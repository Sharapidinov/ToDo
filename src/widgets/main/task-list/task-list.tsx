import { FC } from "react";
import { useAppSelector } from "@/store/store";
import styles from "./task-list.module.scss";
import { CreateColumn } from "@/entities/column/create";
import {Column} from "@/entities/column";
import {IColumn} from "@/store/column/columnSlice";



export const TaskList: FC = () => {
  const columns:IColumn[] = useAppSelector((state) => state.column);

  return (
    <div className={styles.container}>
      {
        columns.map((elem) => (
          <Column columnData={elem} key={elem.id}/>
        ))
      }
      <CreateColumn/>
    </div>
  );
};
