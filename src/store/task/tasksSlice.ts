import { actualGetData } from "@/shared/lib";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import {IColumn} from "../column/columnSlice";

export interface ISubTask {
  subTask: string
  completed: boolean
}

export interface ITask {
  id: string;
  title: string;
  createdAt?: string | null;
  description: string;
  status: IColumn; 
}

type ColumnId = IColumn['id'];

export interface ITasks {
  [key:ColumnId]: ITask[]
}

const storeData = localStorage.getItem('store');
const localState = storeData !== null ? JSON.parse(storeData) : null;

const initialState: ITasks = localState?.tasks|| {};
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, { payload }) => {
      const { newTask, column} = payload
      if( state[column.id] ) {
        state[column.id] = [...state[column.id], { id: uuidv4(), status: column, createdAt: actualGetData(), ...newTask }]
      } else {
        state[column.id] = [{ id: uuidv4(), status: column, createdAt: actualGetData(), ...newTask }]
      }
    },

    changeTaskStatus: (state, {payload}) => {
      const { task, nextColumn } = payload;
      state[task.status.id] = state[task.status.id].filter((t) => t.id !== task.id);

      if (nextColumn && state[nextColumn.id]) {
        state[nextColumn.id] = [...state[nextColumn.id], {...task, status: nextColumn}];
      } else {
        state[nextColumn.id] = [{...task, status: nextColumn}];
      }
    },

    deleteTask: (state, { payload }) => {
      state[payload.status.id] = state[payload.status.id].filter((t) => t.id !== payload.id);
    },


    editTask: (state, { payload }) => { 
	  	state[payload.status.id] = state[payload.status.id].map((elem) => {
	  		if(elem.id === payload.id) {
	  			return {...elem, ...payload}
	  		}
	  		return elem;
	  	})
	  	return state
      },
    },
});


export const { createTask, editTask, changeTaskStatus, deleteTask} = tasksSlice.actions;
export default tasksSlice;
