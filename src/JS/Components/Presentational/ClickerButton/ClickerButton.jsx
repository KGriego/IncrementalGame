/* Library Imports */
import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";

export function ClickerButton(props) {
  const { onClickFunc, text, disabled } = props;
  return (
    <Button
      icon
      disabled={disabled}
      onClick={onClickFunc}
      color={`${disabled ? "red" : "green"}`}
      labelPosition={"left"}
    >
      <Icon name={"add"} />
      {text}
    </Button>
  );
}

ClickerButton.propTypes = {
  onClickFunc: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};
