import * as initialConstants from "../Constants/initialConstants";

export const startTicking = () => ({
  type: initialConstants.start_ticking,
  reducer: "initial"
});
export const ticking = () => ({
  type: initialConstants.ticking,
  reducer: "initial"
});

export const addItemOne = () => ({
  type: initialConstants.add_item,
  reducer: "initial"
});

export const refineItemOne = resourceToRefine => ({
  type: initialConstants.refine_item,
  payload: resourceToRefine,
  reducer: "initial"
});

export const addBuilding = building => ({
  type: initialConstants.add_building,
  payload: building,
  reducer: "initial"
});

export const unlockBuildingOne = () => ({
  type: initialConstants.unlock_building,
  reducer: "initial"
});
