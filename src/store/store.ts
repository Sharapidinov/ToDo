import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import tasksSlice from "./task/tasksSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import columnSlice from "./column/columnSlice";

const saveStateMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    localStorage.setItem('store', JSON.stringify(store.getState()));
    return result;
};

export const rootReducer = combineReducers({
    tasks: tasksSlice.reducer,
    column: columnSlice.reducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveStateMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
