import * as researchConstants from "../Constants/researchConstants";

export const researchItem = (researchItem: string) => ({
  type: researchConstants.first_research,
  payload: researchItem,
  reducer: "research"
});

export const checkResearch = () => ({
  type: researchConstants.check_research,
  reducer: "research"
});
