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
}

export function Resource(props: Props) {
  const { title, amount, text, disabled, clickButtonFunc, costs } = props;
  return (
    <Item>
      <Item.Content>
        <Item.Header as={"h4"}>
          {title}: {amount}
        </Item.Header>
        <Item.Description>
          {costs && (
            <>
              Cost:{" "}
              {costs.map(({ type, amount }, idx: number) => (
                <li key={`${title}+${idx}`}>
                  {type} : {amount}
                </li>
              ))}
            </>
          )}
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
