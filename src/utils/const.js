export const CALL_API = `${process.env.REACT_APP_LINKAPI}`;

export const ACTION_TYPE = Object.freeze({
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
});

export const LIST_PROPERTIES = Object.freeze({
  CURRENT_PAGE: 1,
  PER_PAGE: 10,
});

export const TYPE_POST = Object.freeze({
  WENT_WELL: "Went Well",
  TO_IMPROVE: "To Improve",
  KUDOS: "Kudos",
});

export const NAME_INPUT = Object.freeze({
  EMAIL: "EMAIL",
  PASSWORD: "PASSWORD",
  CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
  FIRST_NAME: "FIRST_NAME",
  LAST_NAME: "LAST_NAME",
  PHONE: "PHONE",
  NAME: "NAME",
  TITLE: "TITLE",
  TYPES: "TYPES",
});

export const TYPE_INPUT = Object.freeze({
  EMAIL: "email",
  PASSWORD: "password",
  TEXT: "text",
  COLOR: "color",
  NUMBER: "number",
});

export const TYPE_MODAL = Object.freeze({
  LOADING: "LOADING",
  ERROR: "ERROR",
  CONFIRM: "CONFIRM",
  ACTION: "ACTION",
});

export const TYPE_REDUCER_ACTION = Object.freeze({
  SET_LOADING: "SET_LOADING",
  SET_CONFIRM: "SET_CONFIRM",
  SET_ERROR: "SET_ERROR",
  SET_END: "SET_END",
  SET_ACTION: "SET_ACTION",
});

export const defaultTodoReducer = {
  isLoading: false,
  isShow: false,
  isError: false,
  isConfirm: false,
  isShowing: null,
  postId: null,
  typeModal: null,
  message: null,
};
