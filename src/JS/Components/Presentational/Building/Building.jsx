/* Library Imports */
import React from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";

/* Component Imports */
import { ClickerButton } from "../ClickerButton";

export function Building(props) {
  return (
    <Item>
      <Item.Content>
        <Item.Header as={"h4"}>
          {props.title}: {props.amount}
        </Item.Header>
        <Item.Description>
          {props.cost && `Cost: ${props.cost}`}
        </Item.Description>
        <ClickerButton
          onClickFunc={props.clickButtonFunc}
          text={props.text}
          disabled={props.disabled}
        />
      </Item.Content>
    </Item>
  );
}

Building.propTypes = {
  clickButtonFunc: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  amount: PropTypes.number.isRequired
};
