/* Component Imports */
import { reducer as notifications } from "../Module/Notifications";
import { reducer as gameData } from "./initialReducer";

const initialState = {
  gameData: {
    resources: {
      itemOne: {
        title: "Item One",
        text: "Add Item One",
        shrtNme: "itemOne",
        amount: 70,
        unlocked: true,
        multiplier: 1,
        limit: 100,
        add: "addItemOne"
      },
      refinedItemOne: {
        title: "Refined Item One",
        text: "Refine Item One",
        shrtNme: "refinedItemOne",
        amount: 0,
        multiplier: 1,
        limit: 50,
        unlocked: true,
        costs: [{ amount: 25, type: "itemOne" }],
        add: "refineItemOne"
      }
    },
    buildings: {
      buildingOne: {
        title: "Building One",
        text: "Buy A Building",
        amount: 0,
        unlocked: false,
        multiplier: 1,
        resources: [{ type: "itemOne", value: 0.1 }],
        costIncreaseMultiplier: 1.35,
        costs: [{ amount: 5, type: "itemOne" }]
      }
    },
    researches: {
      clicking: [
        {
          type: "click",
          text: "Increase Click Multiplier",
          title: "Click Increase 1",
          value: 1,
          unlocked: { type: "clicks", amount: 25, value: false },
          bought: false,
          costs: [
            { resource: "refinedItemOne", amount: 12.5 },
            { resource: "itemOne", amount: 50 }
          ]
        },
        {
          type: "click",
          text: "Increase Click Multiplier",
          title: "Click Increase 2",
          value: 2,
          unlocked: { type: "clicks", amount: 75, value: false },
          bought: false,
          costs: [
            { resource: "refinedItemOne", amount: 1 },
            { resource: "itemOne", amount: 1 }
          ]
        }
      ]
    },
    mouse: {
      clickMultiplier: 1
    },
    stats: {
      clicks: 0
    }
  },
  initialValues: {
    clicking: 1,
    buildings: { buildingOne: { value: 0.1 } }
  }
};

const rootReducer = (state = initialState, action = {}) => {
  console.log(state);
  return {
    notifications: notifications(state.notifications, action),
    parent: { initialState, gameData: state.gameData },
    gameData: gameData(state.gameData, action, state)
  };
};

export default rootReducer;
