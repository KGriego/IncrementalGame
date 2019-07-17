export interface Props {
  parent: object;
  gameData: object;
}
export interface GameData {
  resources: Resources;
  researches: object;
  buildings: Buildings;
  mouse: object;
  stats: Stats;
  costs: object;
}

interface Resources {
  itemOne: {
    amount: number;
    limit: number;
  };
  refinedItemOne: {
    amount: number;
    limit: number;
  };
}

interface Buildings {
  buildingOne: {
    amount: number;
    limit: number;
    unlocked: boolean;
  };
}

interface Stats {
  clicks: number;
}

export interface Action {
  type: string;
  payload: object | any;
  reducer: string;
}
