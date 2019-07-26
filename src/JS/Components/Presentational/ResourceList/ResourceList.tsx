/* Library Imports */
import * as React from "react";
import { Item, Header } from "semantic-ui-react";

/* Component Imports */
import { round } from "../../../Utils/helpers";

/* TypeScript Imports */
import { GameData } from "../../../TypeScriptTypes/types";

interface Parent {
  initialState: {
    initialValues: object;
  };
}

interface Props {
  parent: Parent | any;
  gameData: GameData | any;
}

export function ResourceList(props: Props) {
  const {
    parent: { initialValues },
    gameData: { resources, buildings, mouse }
  } = props;
  return (
    <>
      <Header as={"h1"}>Resources:</Header>
      <Item.Group divided>
        <Item>
          <Item.Content>
            <Item.Description>
              Clicking: {initialValues.clicking * mouse.click.clickMultiplier}
            </Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Description>
              Item 1: {resources.itemOne.amount}/{resources.itemOne.limit}
              {" | "}
              {round(
                buildings.buildingOne.resources[0].value *
                  buildings.buildingOne.amount,
                3
              )}{" "}
              / sec
            </Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Description>
              Refined Item 1: {resources.refinedItemOne.amount} /
              {resources.refinedItemOne.limit}
              {" | "}0 / sec
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
}
