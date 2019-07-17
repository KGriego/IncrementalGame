/* Library Imports */
import * as React from "react";
import { Item } from "semantic-ui-react";

/* Component Imports */
import { ClickerButton } from "../ClickerButton";

interface Props {
  title: string;
  amount: number;
  text: string;
  disabled: boolean;
  clickButtonFunc: any;
  costs: Array<{ type: string; amount: number }>;
  bought: boolean;
}

export function Building(props: Props) {
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
