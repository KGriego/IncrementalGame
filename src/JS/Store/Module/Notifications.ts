// Actions
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

/* TypeScript Imports */
import { Action } from "../../TypeScriptTypes/types";

const initialState = { notification: null };

// Reducers
export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return { notification: action.payload };
    case CLEAR_NOTIFICATIONS:
      return { notification: null };
    default:
      return state;
  }
}

// Action Creators
export const clearNotifications = () => ({ type: CLEAR_NOTIFICATIONS });

export const actions = {
  notifyError: (message = "") => ({
    type: ADD_NOTIFICATION,
    payload: {
      title: "ERROR",
      message,
      level: "error",
      autoDismiss: 0
    }
  }),
  notifySuccess: (message = "", duration = 15) => ({
    type: ADD_NOTIFICATION,
    payload: {
      title: "SUCCESS",
      message,
      level: "success",
      autoDismiss: duration
    }
  }),
  notifyWarning: (message = "", duration = 15) => ({
    type: ADD_NOTIFICATION,
    payload: {
      title: "WARNING",
      message,
      level: "warning",
      autoDismiss: duration
    }
  }),
  notifyInfo: (message = "", duration = 15) => ({
    type: ADD_NOTIFICATION,
    payload: {
      title: "NOTICE",
      message,
      level: "info",
      autoDismiss: duration
    }
  })
};
export const notifyError = (message = "") => ({
  type: ADD_NOTIFICATION,
  payload: {
    title: "ERROR",
    message,
    level: "error",
    autoDismiss: 0
  }
});

export const notifySuccess = (message = "", duration = 15) => {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      title: "SUCCESS",
      message,
      level: "success",
      autoDismiss: duration
    }
  };
};

export const notifyWarning = (message = "", duration = 15) => {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      title: "WARNING",
      message,
      level: "warning",
      autoDismiss: duration
    }
  };
};

export const notifyInfo = (message = "", duration = 15) => {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      title: "NOTICE",
      message,
      level: "info",
      autoDismiss: duration
    }
  };
};
