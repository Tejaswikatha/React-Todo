import { ADD_EDIT_TODO_ITEM, COMPLETE_TASK, DELETE_ITEM } from "../types";

const initialState = {
  tasks: [
    { name: "Eat", completed: true },
    { name: "Sleep" },
    { name: "Repeat" },
  ],
};

export function toDoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EDIT_TODO_ITEM: {
      let { item, item_index } = action;
      let { tasks } = state;
      item_index = item_index >= 0 ? item_index : tasks.length;
      tasks = [
        ...tasks.slice(0, item_index),
        item,
        ...tasks.slice(item_index + 1),
      ];
      return { ...state, tasks };
    }
    case DELETE_ITEM: {
      const { item_index } = action;
      let { tasks } = state;
      tasks = [...tasks.slice(0, item_index), ...tasks.slice(item_index + 1)];
      return { ...state, tasks };
    }
    case COMPLETE_TASK: {
      const { item_index } = action;
      let { tasks } = state;
      const taskItem = tasks[item_index];
      tasks = [
        ...tasks.slice(0, item_index),
        { ...taskItem, completed: true },
        ...tasks.slice(item_index + 1),
      ];
      return { ...state, tasks };
    }
    default:
      return state;
  }
}
