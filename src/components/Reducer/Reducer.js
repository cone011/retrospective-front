import { TYPE_REDUCER_ACTION } from "../../Utils/const";

export const todoReducer = (curTodo, action) => {
  switch (action.type) {
    case TYPE_REDUCER_ACTION.SET_LOADING:
      return {
        ...curTodo,
        isLoading: true,
        message: action.message,
        typeModal: action.typeModal,
      };
    case TYPE_REDUCER_ACTION.SET_CONFIRM:
      return {
        ...curTodo,
        isConfirm: true,
        isLoading: false,
        message: action.message,
        typeModal: action.typeModal,
      };
    case TYPE_REDUCER_ACTION.SET_ERROR:
      return {
        ...curTodo,
        isError: true,
        isLoading: false,
        message: action.message,
        typeModal: action.typeModal,
      };
    case TYPE_REDUCER_ACTION.SET_END:
      return {
        ...curTodo,
        isLoading: false,
        isConfirm: false,
        isError: false,
      };
    default:
      throw new Error("This action is not on the list");
  }
};
