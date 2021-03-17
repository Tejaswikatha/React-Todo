import { createStore } from "redux";
import { toDoReducer } from "./reducers";

export const store = createStore(toDoReducer)
