/* Library Imports */

/* Component Imports */
import * as initialConstants from "../Constants/initialConstants";
import * as researchConstants from "../Constants/researchConstants";
import { round } from "../../Utils/helpers";

const intialState = {
  resources: {
    itemOne: 0,
    refinedItemOne: 0
  },
  buildings: {
    buildingOne: 0
  },
  limits: {
    itemOne: 100,
    refinedItemOne: 100
  },
  costs: {
    resources: { refinedItemOne: 25 },
    buildings: { buildingOne: 5 },
    research: {
      clicking: [
        { resource: "refinedItemOne", amount: 12.5 },
        { resource: "itemOne", amount: 50 }
      ],
      limitItemOne: [
        { resource: "refinedItemOne", amount: 25 },
        { resource: "itemOne", amount: 100 }
      ]
    }
  },
  defaultAdd: {
    clicking: 1,
    buildingOne: 0.1
  },
  unlocked: {
    buildingOne: false
  },
  researched: {
    clicking: false,
    increaseItemOneLimit: false,
    clickingIncreaseValue: 1,
    increaseItemOneLimitValue: 100
  },
  costIncreaseMultiplier: 1.4
};

export function reducer(state = intialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case initialConstants.add_item_success: {
      return {
        ...state,
        resources: {
          ...state.resources,
          itemOne: state.resources.itemOne + state.defaultAdd.clicking
        }
      };
    }
    case initialConstants.refine_item_success: {
      return {
        ...state,
        resources: {
          ...state.resources,
          itemOne:
            state.resources.itemOne - state.costs.resources.refinedItemOne,
          refinedItemOne: state.resources.refinedItemOne + 1
        }
      };
    }
    case initialConstants.add_building_success: {
      const cost = round(
        state.costs.buildings.buildingOne * state.costIncreaseMultiplier,
        3
      );
      return {
        ...state,
        buildings: {
          ...state.buildings,
          buildingOne: state.buildings.buildingOne + 1
        },
        resources: {
          ...state.resources,
          itemOne: state.resources.itemOne - payload
        },
        costs: {
          ...state.costs,
          buildings: { ...state.costs.buildings, buildingOne: cost }
        }
      };
    }
    case initialConstants.unlock_building: {
      return { ...state, unlocked: { ...state.unlocked, buildingOne: true } };
    }
    case researchConstants.first_research_success: {
      const resources = state.costs.research.clicking.forEach(
        ({ resource, amount }) => {
          return (state.resources[resource] -= amount);
        }
      );
      return {
        ...state,
        resources: { ...state.resources },
        researched: {
          ...state.researched,
          [payload]: true
        },
        defaultAdd: {
          ...state.defaultAdd,
          clicking:
            state.defaultAdd.clicking + state.researched.clickingIncreaseValue
        }
      };
    }
    case initialConstants.ticking: {
      const amount =
        state.resources.itemOne +
        state.defaultAdd.buildingOne * state.buildings.buildingOne;

      const itemOne = round(amount);
      return { ...state, resources: { ...state.resources, itemOne } };
    }
    default:
      return state;
  }
}
