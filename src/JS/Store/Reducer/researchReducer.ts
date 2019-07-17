/* Library Imports */
import * as _ from "lodash";

/* Component Imports */
import * as researchConstants from "../Constants/researchConstants";
import { checkingResearch } from "../../Utils/helpers";

/* TypeScript Imports */
import { Action } from "../../TypeScriptTypes/types";

export function reducer(state: any, action: Action, root: any) {
  const { type = "", payload = {} } = action;
  switch (type) {
    case researchConstants.first_research_success: {
      const { research, idx } = payload;
      const researchItem = state.researches[research][idx];

      researchItem.bought = true;
      state.mouse.clickMultiplier += researchItem.value;

      return { ...state };
    }
    case researchConstants.check_research_success: {
      const newState = checkingResearch(state);

      return { ...newState };
    }
    case researchConstants.unlocked_research_item_success: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
}