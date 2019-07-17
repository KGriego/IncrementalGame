/* Component Imports */
import { reducer as notifications } from "../Module/Notifications";
import { reducer as gameData } from "./initialReducer";

/* TypeScript Imports */
import { Action } from "../../TypeScriptTypes/types";

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
        limit: 50,
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
          unlocked: [
            { category: "stats", name: "clicks", amount: 25, value: false }
          ],
          bought: false,
          costs: [
            { resource: "refinedItemOne", amount: 1 },
            { resource: "itemOne", amount: 1 }
          ]
        },
        {
          type: "click",
          text: "Increase Click Multiplier",
          title: "Click Increase 2",
          value: 2,
          unlocked: [
            { category: "stats", name: "clicks", amount: 75, value: false }
          ],
          bought: false,
          costs: [
            { resource: "refinedItemOne", amount: 1 },
            { resource: "itemOne", amount: 1 }
          ]
        }
      ],
      resources: [
        {
          type: "storage",
          text: "Increase Item One Limit",
          title: "Item One Limit Increase",
          value: 100,
          unlocked: [
            { category: "stats", name: "clicks", amount: 100, value: false },
            {
              category: "resources",
              name: "itemOne",
              amount: 100,
              value: false
            }
          ]
        }
      ]
    },
    mouse: { clickMultiplier: 1 },
    stats: { clicks: 19 }
  },
  initialValues: { clicking: 1 },
  notifications: { notification: null }
};

export const rootReducer = (state = initialState, action: Action) => {
  console.log(state);
  return {
    notifications: notifications(state.notifications, action),
    parent: { initialState, gameData: state.gameData },
    gameData: gameData(state.gameData, action, state)
  };
};
