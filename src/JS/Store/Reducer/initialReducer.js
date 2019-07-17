/* Library Imports */

/* Component Imports */
import * as initialConstants from "../Constants/initialConstants";
import { reducer as researchReducer } from "./researchReducer";
import { round, refineResource, buyBuilding, tick } from "../../Utils/helpers";

export function reducer(state, action = {}, root) {
  const { type, payload, reducer } = action;
  switch (reducer) {
    case "research": {
      const newState = _.cloneDeep(state);
      const game = researchReducer(newState, action, root);
      return { ...game };
    }
    case "initial": {
      switch (type) {
        case initialConstants.add_item_success: {
          return {
            ...state,
            resources: {
              ...state.resources,
              itemOne: {
                ...state.resources.itemOne,
                amount: round(
                  root.parent.gameData.mouse.clickMultiplier *
                    root.parent.initialState.initialValues.clicking +
                    state.resources.itemOne.amount,
                  3
                )
              }
            },
            stats: {
              ...state.stats,
              clicks: state.stats.clicks + 1
            }
          };
        }
        case initialConstants.refine_item_success: {
          const newResources = refineResource(payload, state.resources);
          return { ...state, resources: newResources };
        }
        case initialConstants.add_building_success: {
          const { newResources, newBuldings } = buyBuilding(
            payload,
            state.buildings,
            state.resources
          );
          return { ...state, buildings: newBuldings, resources: newResources };
        }
        case initialConstants.unlock_building: {
          return {
            ...state,
            buildings: {
              ...state.buildings,
              buildingOne: { ...state.buildings.buildingOne, unlocked: true }
            }
          };
        }
        case initialConstants.ticking: {
          const newState = tick(state, root);
          return { ...newState };
        }
        default: {
          return state;
        }
      }
    }
    default: {
      return state;
    }
  }
}
