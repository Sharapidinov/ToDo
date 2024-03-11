import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export interface IColumn {
  id: string;
  title: string;
}

export const columns: IColumn[] = [
  {
    id: "new",
    title: "New",
  },
  {
    id: "inProgress",
    title: "In Progress",
  },
  {
    id: "onTesting",
    title: "Testing",
  },
  {
    id: "completed",
    title: "Completed",
  },
];

const storeData = localStorage.getItem('store');
const localState = storeData !== null ? JSON.parse(storeData) : null;

const initialState = localState?.column.length ? localState?.column :columns;


const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    createColumn: (state, { payload }) => {
      return [
        ...state,
        { id: uuidv4(), ...payload },
      ];
    },
    deleteColumn: (state, { payload }) => {
      return state.filter((t:IColumn) => t.id !== payload.id);
    },
    editColumn: (state, action) => {
      return state.map((elem:IColumn) => {
        if (elem.id === action.payload.id) {
          return { ...elem, ...action.payload };
        }
        return elem;
      });
    },
  },
});

export const { createColumn, editColumn, deleteColumn } = columnSlice.actions;
export default columnSlice;
