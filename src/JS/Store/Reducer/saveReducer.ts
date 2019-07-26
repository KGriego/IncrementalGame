/* Library Imports */
import * as _ from "lodash";

/* Component Imports */
import * as saveConstants from "../Constants/saveConstants";

/* TypeScript Imports */
import { Action } from "../../TypeScriptTypes/types";

export function reducer(state: any, action: Action, root: any) {
  root;
  const { type, payload } = action;
  switch (type) {
    case saveConstants.save_game: {
      localStorage.setItem("save", btoa(JSON.stringify(root)));
      return { ...state };
    }
    default: {
      return state;
    }
  }
}
