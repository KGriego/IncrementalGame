import * as saveConstants from "../Constants/saveConstants";

export const saveGame = () => ({
  type: saveConstants.save_game,
  reducer: "tick"
});
