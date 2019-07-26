/* Library Imports */
import * as _ from "lodash";

/* Component Imports */

/* TypeScript Imports */
import {
  Resources,
  Resource,
  Building,
  GameData,
  ResearchItems,
  BuildingResources
} from "../TypeScriptTypes/types";

export const delay = (duration = 1000) =>
  new Promise(r => setTimeout(() => r(), duration));

export const round = (value = 0, precision = 1) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

//if the valueOne is smaller than valueTwo return true
export const isDisabled = (valueOne = 0, valueTwo = 0) => valueOne < valueTwo;

export const canBuy = (
  itemToBuy: Resource | Building,
  resources: Resources
) => {
  //if the amount of the item is bigger than the limit
  if (itemToBuy.hasCost) {
    if (itemToBuy.amount + 1 > itemToBuy.limit) {
      return true;
    } else {
      //go over every resource
      const value = itemToBuy.costs.map(
        cost =>
          //might have an issue when there is more than one cost
          //if we have neough resources to buy the item
          cost.amount <= resources[cost.type].amount
      );
      //if the array contains a value of false, we shouldn't be able to buy it
      return !_.includes(value, true);
    }
  } else {
    if (itemToBuy.amount + 1 > itemToBuy.limit) {
      return true;
    }
    //there should be no cost and we can buy it
    return false;
  }
};

export const refineResource = (refinedResource = "", resources: any) => {
  //clone the resources to new a object
  const newResources = _.cloneDeep(resources);
  //grab the cost of the item to refine
  const costs = resources[refinedResource].costs;
  costs.forEach((cost: any) => {
    //charge the resource the amount that it costs to create it
    newResources[cost.type].amount -= cost.amount;
    //add to the resource we just bought
    newResources[refinedResource].amount += 1;
  });
  return newResources;
};

export const buyBuilding = (
  buildingToBuy = "",
  buildings: any,
  resources: any
) => {
  //clone the resources to new a object
  const newResources = _.cloneDeep(resources);
  const newBuldings = _.cloneDeep(buildings);
  //grab the costs of the building we are buying
  const costs = buildings[buildingToBuy].costs;
  //for every cost
  costs.forEach((cost: any) => {
    //charge the resource the amount that it costs to create it
    newResources[cost.type].amount = round(
      newResources[cost.type].amount - cost.amount,
      3
    );
    //increase the cost of the building and round it to the nearest 3rd
    cost.amount = round(
      cost.amount * newBuldings[buildingToBuy].costIncreaseMultiplier,
      3
    );
    //add to the resource we just bought
    newBuldings[buildingToBuy].amount += 1;
  });
  //add the new cost to the building we just bought
  newBuldings[buildingToBuy].costs = costs;
  //return an object with the new amount of resources and buildings
  return { newResources, newBuldings };
};

export const tick = (state: GameData, root: any) => {
  root;
  //clone the state
  const newState = _.cloneDeep(state);
  //grab all the buildings
  const buildings = Object.keys(newState.buildings);
  //for every building
  buildings.forEach(building => {
    //shorthand so it's not as long
    const build = newState.buildings[building];
    //if there is more than 0 buildings
    if (build.amount > 0) {
      //for every resource that it effects
      build.resources.forEach((buildingResource: BuildingResources) => {
        //shorthand
        const resource = newState.resources[buildingResource.type];
        //add the resource that it affect and round it to the nearest tenth
        const value = buildingResource.value * build.amount;
        const amount = round(
          resource.amount + value * resource.multiplier * build.multiplier,
          1
        );
        if (Math.trunc(amount) > resource.limit) {
          //if the resource amount without decimals is bigger than the limit, return
          return;
        } else if (Math.trunc(amount) == resource.limit) {
          //if the amount is the same as the limit, set it to the limit
          resource.amount = resource.limit;
        } else {
          //else add to the amount
          resource.amount = amount <= resource.limit ? amount : resource.limit;
        }
      });
    }
  });
  //return the new state
  return newState;
};

export const checkingResearch = (state: GameData) => {
  const { researches } = state;
  const researchItems = Object.keys(researches);

  researchItems.forEach(key => {
    return researches[key].forEach((item: ResearchItems) => {
      return item.unlocked.forEach(criteria => {
        if (
          state[criteria.category][criteria.name] >= criteria.amount &&
          !criteria.value
        ) {
          criteria.value = true;
        }
      });
    });
  });

  return state;
};

export const buyResearchitem = (
  state: GameData,
  researching: string,
  idx: number
) => {
  const items = state[researching];
  const researchItem = state.researches[researching][idx];

  researchItem.bought = true;

  items[researchItem.resource][researchItem.type] += researchItem.value;

  return state;
};

// export const increaseCost = itemToIncrease => {
//   const newItem = _.cloneDeep(itemToIncrease);

//   newItem.costs.map(cost => {
//     cost.amount = cost.amount * itemToIncrease.costIncreaseMultiplier;
//     return cost;
//   });
//   return newItem;
// };
