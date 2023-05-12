import { TYPE_REDUCER_ACTION } from "../../utils/const";

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
        isShowing: false,
        message: action.message,
        typeModal: action.typeModal,
      };
    case TYPE_REDUCER_ACTION.SET_ERROR:
      return {
        ...curTodo,
        isError: true,
        isLoading: false,
        isConfirm: false,
        isError: false,
        isShowing: false,
        haveComments: false,
        isForm: false,
        message: action.message,
        typeModal: action.typeModal,
      };
    case TYPE_REDUCER_ACTION.SET_ACTION:
      return {
        ...curTodo,
        isShowing: true,
        postId: action.postId,
        message: action.message,
        typeModal: action.typeModal,
      };
    case TYPE_REDUCER_ACTION.SET_COMMENT:
      return {
        ...curTodo,
        haveComments: action.haveComments,
        compoment: action.compoment,
      };
    case TYPE_REDUCER_ACTION.SET_COMMENT_FORM:
      return {
        ...curTodo,
        isForm: true,
        compoment: action.compoment,
      };
    case TYPE_REDUCER_ACTION.SET_END:
      return {
        ...curTodo,
        isLoading: false,
        isConfirm: false,
        isError: false,
        isShowing: false,
        haveComments: false,
        isForm: false,
      };
    default:
      throw new Error("This action is not on the list");
  }
};
