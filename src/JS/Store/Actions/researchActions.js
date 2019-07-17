import * as researchConstants from "../Constants/researchConstants";

export const researchItem = researchItem => ({
  type: researchConstants.first_research,
  payload: researchItem,
  reducer: "research"
});

export const checkResearchItems = () => ({
  type: researchConstants.check_research,
  reducer: "research"
});
