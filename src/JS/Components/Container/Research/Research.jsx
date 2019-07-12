/* Library Imports */
import React, { Component } from "react";
import { Grid, Tab } from "semantic-ui-react";

/* Redux Imports */
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/researchActions";

/* Component Imports */
import { ResearchItem } from "../../Presentational/ResearchItem";

/* Component Imports */

class Research extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  researchItem = research => {
    this.props.actions.researchItem(research);
  };

  isResearchDisabled = cost => {
    const { resources } = this.props.itemOneState;
    let isDisabled;
    cost.map(({ resource, amount }) =>
      amount > resources[resource] ? (isDisabled = true) : (isDisabled = false)
    );
    return isDisabled;
  };

  render() {
    const { itemOneState, researchState } = this.props;
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column computer={"14"} tablet={"14"}>
            {!researchState.clicking && (
              <ResearchItem
                title={"Research Click Increase 1"}
                text={"Click Multiplier"}
                disabled={this.isResearchDisabled(
                  itemOneState.costs.research.clicking
                )}
                cost={itemOneState.costs.research.clicking}
                clickButtonFunc={() => this.researchItem("clicking")}
              />
            )}
            {!researchState.increaseItemOneLimit && (
              <ResearchItem
                title={"Increase Limit for Item One"}
                text={"Increase Limit"}
                disabled={this.isResearchDisabled(
                  itemOneState.costs.research.limitItemOne
                )}
                cost={itemOneState.costs.research.limitItemOne}
                clickButtonFunc={() =>
                  this.researchItem("increaseItemOneLimit")
                }
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = ({ initialReducer }) => ({
  itemOneState: initialReducer,
  researchState: initialReducer.researched
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Research);
