import { FC } from "react";
import { useDispatch } from "react-redux";
import { createTask, ITask } from "@/store/task/tasksSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";

import styles from "./create-task.module.scss";
import { IColumn } from "@/store/column/columnSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/shared/ui";

interface Props {
  onClose: () => void;
  column: IColumn
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Обязательное поле").max(100, "Название не должно превышать 100 символов"),
  description: Yup.string().required("Обязательное поле"),
})

export const TaskForm: FC<Props> = ({ onClose, column }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values: Omit<ITask, "id" | "createdAt" | "status">, resetForm: () => void) => {
    dispatch(
      createTask({
        newTask: values,
        column: column
      })
    );
    resetForm();
    onClose();
    toast.success("Task created successfully!");
  }

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        subTasks: [""],
      }}
      validateOnBlur
      validateOnChange
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values, resetForm);
      }}
    >
      {() => (
        <Form className={styles.form}>
          <div className={styles.form_title}>
            <label htmlFor="title">Title:</label>
            <Field name="title" placeholder="Enter a task title" />
            <ErrorMessage name="title" className={styles.error} component={"p"} />
          </div>

          <div className={styles.form_description}>
            <label htmlFor="description">Description:</label>
            <Field as="textarea" placeholder="Enter a task description" name="description" />
            <ErrorMessage name="description" className={styles.error} component={"p"} />
          </div>
          
          <div className={styles.buttons}>
            <Button htmlType="submit" data-testid="add-task">Add Task</Button>
            <Button htmlType="button" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
};
