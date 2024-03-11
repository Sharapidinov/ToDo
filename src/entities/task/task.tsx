import React, { DragEvent, useState } from "react";
import { EditForm } from "@/features/edit-task/edit-task";

import { Button, Modal } from "@/shared/ui";
import { useAppDispatch } from "@/store/store";
import { deleteTask, ITask } from "@/store/task/tasksSlice";
import styles from "./task.module.scss";
import {toast} from "react-toastify";

interface TaskProps {
  task: ITask;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTask(task));
    toast.success("You successfully delete task")

  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('application/json', JSON.stringify(task));
  }

  return (
    <div
      draggable={true}
      className={styles.container}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
    >
      <span className={styles.title}><b>{task?.title}</b></span>
      <span className={styles.title}>{task?.description}</span>
      <div className={styles.buttons}>
        <Button type="secondary" onClick={handleDelete}>Remove</Button>
        <Button type="secondary" onClick={toggleModal}>Edit</Button>
      </div>
      {isModalOpen && task && (
        <Modal onClose={toggleModal} data-testid={"edit-modal"}>
          <EditForm onClose={toggleModal} task={task} />
        </Modal>
      )}
    </div>
  );
};

export default Task;
