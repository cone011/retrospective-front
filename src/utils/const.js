export const CALL_API = `${process.env.REACT_APP_LINKAPI}`;

export const NAME_INPUT = Object.freeze({
  EMAIL: "EMAIL",
  PASSWORD: "PASSWORD",
  CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
  FIRST_NAME: "FIRST_NAME",
  LAST_NAME: "LAST_NAME",
  PHONE: "PHONE",
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
});

export const TYPE_REDUCER_ACTION = Object.freeze({
  SET_LOADING: "SET_LOADING",
  SET_CONFIRM: "SET_CONFIRM",
  SET_ERROR: "SET_ERROR",
  SET_END: "SET_END",
});

export const defaultTodoReducer = {
  isLoading: false,
  isShow: false,
  isError: false,
  isConfirm: false,
  typeModal: null,
  message: null,
};
