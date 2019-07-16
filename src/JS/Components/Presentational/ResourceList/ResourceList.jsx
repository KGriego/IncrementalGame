/* Library Imports */
import React from "react";
import PropTypes from "prop-types";
import { Item, Header } from "semantic-ui-react";

/* Component Imports */
import { round } from "../../../Utils/helpers";

export function ResourceList(props) {
  const {
    parent: {
      initialState: { initialValues }
    },
    gameData: { resources, buildings }
  } = props;
  return (
    <>
      <Header as={"h1"}>Resources:</Header>
      <Item.Group divided>
        <Item>
          <Item.Content>
            <Item.Description>
              Clicking: {initialValues.clicking}
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

ResourceList.propTypes = {};
