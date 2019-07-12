// Actions
export const ADD_NOTIFICATION = "nsm_ops/notifications/ADD_NOTIFICATION";
export const CLEAR_NOTIFICATIONS = "nsm_ops/notifications/CLEAR_NOTIFICATIONS";

const initialState = { notification: null };

// Reducers
export function reducer(state = initialState, action = {}) {
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

export const notifyError = message => ({
  type: ADD_NOTIFICATION,
  payload: {
    title: "ERROR",
    message,
    level: "error",
    autoDismiss: 0
  }
});

export const notifySuccess = (message, duration = 15) => {
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

export const notifyWarning = (message, duration = 15) => {
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

export const notifyInfo = (message, duration = 15) => {
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
