import { configureStore } from "@reduxjs/toolkit"
import { columns } from "../column/columnSlice"
import { rootReducer } from "../store"
import { ITasks } from "../task/tasksSlice";


export const mockTasks: ITasks = {
  "inProgress": [{
    id: '1',
    title: 'Task 1',
    createdAt: '2023-07-05T10:00:00',
    description: 'Description of Task 1',
    status:{
      id: "inProgress",
      title: "In process",
    },
  }],
 "onTesting" : [{
    id: '2',
    title: 'Task 2',
    createdAt: '2023-07-05T11:30:00',
    description: 'Description of Task 2',
    status: {
      id: "onTesting",
      title: "Testing",
    },
  }],
  "completed": [{
    id: '3',
    title: 'Task 3',
    createdAt: '2023-07-05T14:45:00',
    description: 'Description of Task 3',
    status: {
      id: "completed",
      title: "Completed",
    },
  }],
  "new": [{
    id: '4',
    title: 'Task 4',
    createdAt: '2023-07-05T14:45:00',
    description: 'Description of Task 4',
    status: {
      id: "new",
      title: "New",
    },
  }],
};

export const createMockStore = ({ initialState }: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: { tasks: mockTasks, column: columns, ...initialState }
  });
};
