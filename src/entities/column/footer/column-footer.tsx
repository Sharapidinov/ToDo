import { TaskForm } from "@/features/create-task";
import { Modal } from "@/shared/ui";
import { IColumn } from "@/store/column/columnSlice";
import React, { useState } from "react";
import styles from "./column-footer.module.scss";
import {Button} from "@/shared/ui/button";
import {deleteColumn} from "@/store/column/columnSlice";
import {useAppDispatch} from "@/store/store";
import {toast} from "react-toastify";

interface ColumnFooterProps {
  columnData: IColumn;
}

export const ColumnFooter: React.FC<ColumnFooterProps> = ({ columnData }) => {
  const [isOpenTaskModal, setIsOpenTaskModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  const toggleTaskModal = () => {
    setIsOpenTaskModal(!isOpenTaskModal);
  };

  const handleDelete = () => {
    dispatch(deleteColumn(columnData));
    toast.success("You successfully delete column")
  };

  return (
    <>
      <div className={styles.column_footer} data-testid={"column-footer"}>
        <Button onClick={handleDelete} type={"secondary"} className={styles.button}>
          Remove
        </Button>
        <Button onClick={toggleTaskModal} type={"secondary"} className={styles.button}>
          Add Task
        </Button>
      </div>
      {isOpenTaskModal && (
        <Modal onClose={toggleTaskModal}>
          <TaskForm column={columnData} onClose={toggleTaskModal} />
        </Modal>
      )}
    </>
  );
};
