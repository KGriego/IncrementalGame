/* Library Imports */
import * as React from "react";
import { Button, Icon } from "semantic-ui-react";

interface Props {
  onClickFunc: any;
  text: string;
  disabled: boolean;
}

export function ClickerButton(props: Props) {
  const { onClickFunc, text, disabled } = props;
  const string = disabled ? "red" : "green";
  return (
    <Button
      icon
      disabled={disabled}
      onClick={onClickFunc}
      color={string}
      labelPosition={"left"}
    >
      <Icon name={"add"} />
      {text}
    </Button>
  );
}
