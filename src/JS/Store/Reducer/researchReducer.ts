/* Library Imports */
import * as _ from "lodash";

/* Component Imports */
import * as researchConstants from "../Constants/researchConstants";
import { checkingResearch, buyResearchitem } from "../../Utils/helpers";

/* TypeScript Imports */
import { Action } from "../../TypeScriptTypes/types";

export function reducer(state: any, action: Action, root: any) {
  root;
  const { type, payload } = action;
  switch (type) {
    case researchConstants.first_research_success: {
      const { research, idx } = payload;
      const newState = buyResearchitem(state, research, idx);

      return { ...newState };
    }
    case researchConstants.check_research_success: {
      const newState = checkingResearch(state);
      return { ...newState };
    }
    default: {
      return state;
    }
  }
}
