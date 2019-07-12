import * as initialConstants from "../Constants/initialConstants";

export const startTicking = () => ({ type: initialConstants.start_ticking });
export const ticking = () => ({ type: initialConstants.ticking });

export const addItemOne = () => ({ type: initialConstants.add_item });

export const refineItemOne = () => ({ type: initialConstants.refine_item });

export const addBuilding = cost => ({
  type: initialConstants.add_building,
  payload: cost
});

export const unlockBuildingOne = () => ({
  type: initialConstants.unlock_building
});
