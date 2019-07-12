/* Library Imports */
import React from "react";
import PropTypes from "prop-types";
import { Item, Header } from "semantic-ui-react";

/* Component Imports */
import { round } from "../../../Utils/helpers";

export function ResourceList(props) {
  const { resources, limits, defaultAdd, buildings } = props;
  return (
    <>
      <Header as={"h1"}>Resources:</Header>
      <Item.Group divided>
        <Item>
          <Item.Content>
            <Item.Description>Clicking: {defaultAdd.clicking}</Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Description>
              Item 1: {resources.itemOne}/{limits.itemOne}
              {" | "}
              {round(defaultAdd.buildingOne * buildings.buildingOne, 3)} / sec
            </Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Description>
              Refined Item 1: {resources.refinedItemOne} /
              {limits.refinedItemOne}
              {" | "}0 / sec
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
}

ResourceList.propTypes = {};
