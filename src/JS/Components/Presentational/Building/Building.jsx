/* Library Imports */
import React from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";

/* Component Imports */
import { ClickerButton } from "../ClickerButton";

export function Building(props) {
  const { title, amount, text, disabled, clickButtonFunc, costs } = props;
  return (
    <Item>
      <Item.Content>
        <Item.Header as={"h4"}>
          {title}: {amount}
        </Item.Header>
        <Item.Description>
          Cost:{" "}
          {costs.map(({ type, amount }, idx) => (
            <li key={`${title}+${idx}`}>
              {type} : {amount}
            </li>
          ))}
        </Item.Description>
        <ClickerButton
          onClickFunc={clickButtonFunc}
          text={text}
          disabled={disabled}
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
