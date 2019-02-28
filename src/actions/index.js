import { ADD_TODO } from "../constants";
export const addTodo = (text)=> {
  return {
      type :ADD_TODO,
      text
  }
}

