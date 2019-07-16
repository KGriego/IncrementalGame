/* Library Imports */
import React from "react";
import PropTypes from "prop-types";
import { Item, List, Header } from "semantic-ui-react";

/* Component Imports */
import { ClickerButton } from "../ClickerButton";

export function ResearchItem(props) {
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
                {costs.map((item, idx) => (
                  <List.Item key={`${item}-${idx}`}>
                    <List.Content>
                      <List.Description>
                        {item.resource} : {item.amount}
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

ResearchItem.propTypes = {
  clickButtonFunc: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cost: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};
