/* Library Imports */
import * as _ from "lodash";

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
        amount: 0,
        hasCost: false,
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
        hasCost: true,
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
        hasCost: true,
        resources: [{ type: "itemOne", value: 0.1 }],
        costIncreaseMultiplier: 1.35,
        costs: [{ amount: 5, type: "itemOne" }]
      }
    },
    researches: {
      mouse: [
        {
          type: "clickMultiplier",
          resource: "click",
          text: "Increase Click Multiplier",
          title: "Click Increase 1",
          value: 1,
          unlocked: [
            { category: "stats", name: "clicks", amount: 25, value: false }
          ],
          bought: false,
          costs: [
            { resource: "refinedItemOne", amount: 10 },
            { resource: "itemOne", amount: 50 }
          ]
        },
        {
          type: "clickMultiplier",
          resource: "click",
          text: "Increase Click Multiplier",
          title: "Click Increase 2",
          value: 2,
          unlocked: [
            { category: "stats", name: "clicks", amount: 75, value: false }
          ],
          bought: false,
          costs: [
            { resource: "refinedItemOne", amount: 25 },
            { resource: "itemOne", amount: 100 }
          ]
        }
      ],
      resources: [
        {
          type: "limit",
          resource: "itemOne",
          text: "Increase Item One Limit",
          title: "Item One Limit Increase",
          value: 100,
          unlocked: [
            { category: "stats", name: "clicks", amount: 300, value: false }
          ],
          costs: [
            { resource: "refinedItemOne", amount: 50 },
            { resource: "itemOne", amount: 100 }
          ]
        }
      ]
    },
    mouse: { click: { clickMultiplier: 1 } },
    stats: { clicks: 0 }
  },
  initialValues: { clicking: 1 },
  notifications: { notification: null }
};

const localSave = localStorage.getItem("save");
const savedState = localSave ? JSON.parse(atob(localSave)) : initialState;

export const rootReducer = (state: any = savedState, action: Action) => {
  // console.log(state);
  return {
    notifications: notifications(state.notifications, action),
    parent: { ...{ ...initialState, gameData: state.gameData } },
    gameData: gameData(state.gameData, action, state)
  };
};
