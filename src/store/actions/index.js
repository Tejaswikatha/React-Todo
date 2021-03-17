import { ADD_EDIT_TODO_ITEM, COMPLETE_TASK, DELETE_ITEM } from "../types"

export const addEditTask = payload => {
    return {
        type: ADD_EDIT_TODO_ITEM,
        ...payload
    }
}

export const deleteTask = payload => {
    return {
        type: DELETE_ITEM,
        ...payload
    }
}

export const completeTask = payload => {
    return {
        type: COMPLETE_TASK,
        ...payload
    }
}