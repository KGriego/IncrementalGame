/* Library Imports */
import * as React from "react";
import { Item, List, Header } from "semantic-ui-react";

/* Component Imports */
import { ClickerButton } from "../ClickerButton";

interface Props {
  title: string;
  amount: number;
  text: string;
  disabled: boolean;
  clickButtonFunc: any;
  costs: Array<{ resource: string; amount: number }>;
  bought: boolean;
}

export function ResearchItem(props: Props) {
  const { costs, title, text, disabled, clickButtonFunc, bought } = props;
  return (
    <Item>
      <Item.Content>
        <Item.Header as={"h4"}>{title}</Item.Header>
        <Item.Description>
          {costs && Array.isArray(costs) ? (
            <>
              <Header>Cost:</Header>
              <List bulleted>
                {costs.map(({ resource, amount }, idx: number) => (
                  <List.Item key={`${resource}-${idx}`}>
                    <List.Content>
                      <List.Description>
                        {resource} : {amount}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </>
          ) : (
            `Cost: ${costs}`
          )}
        </Item.Description>
        {!bought && (
          <ClickerButton
            onClickFunc={clickButtonFunc}
            text={text}
            disabled={disabled}
          />
        )}
      </Item.Content>
    </Item>
  );
}
