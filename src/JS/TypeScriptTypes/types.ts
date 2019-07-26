export interface Props {
  parent: object;
  gameData: object;
}
export interface GameData {
  resources: Resources;
  researches: Researches;
  buildings: Buildings;
  mouse: object;
  stats: Stats;
  costs: object;
}

export interface Resources {
  itemOne: Resource;
  refinedItemOne: Resource;
}

export interface Costs {
  amount: number;
  type: string;
  resource: string;
}

export interface Resource {
  amount: number;
  limit: number;
  hasCost: boolean;
  title: string;
  text: string;
  unlocked: boolean;
  multiplier: number;
  costs: Array<Costs>;
}

export interface Buildings {
  buildingOne: Building;
}

export interface Building {
  amount: number;
  limit: number;
  hasCost: boolean;
  title: string;
  text: string;
  unlocked: boolean;
  multiplier: number;
  costIncreaseMultiplier: number;
  costs: Array<Costs>;
  resources: Array<BuildingResources>;
}

export interface BuildingResources {
  type: string;
  value: number;
}

export interface Researches {
  clicking: Array<ResearchItems>;
  resources: Array<ResearchItems>;
}

export interface ResearchItems {
  type: string;
  text: string;
  title: string;
  value: number;
  unlocked: Array<{
    category: string;
    name: string;
    amount: number;
    value: boolean;
  }>;
  amount: number;
  bought: boolean;
  costs: Array<Costs>;
}

interface Stats {
  clicks: number;
}

export interface Action {
  type: string;
  payload: any | object;
  reducer: string;
}
