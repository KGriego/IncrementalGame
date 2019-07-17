/* Library Imports */
import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

/* Redux Imports */
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/researchActions";

/* Component Imports */
import { ResearchItem } from "../../Presentational/ResearchItem";

class Research extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  researchItem = (research, idx) => {
    this.props.actions.researchItem({ research, idx });
  };

  isResearchDisabled = cost => {
    const { resources } = this.props.itemOneState;
    let isDisabled;
    cost.map(({ resource, amount }) =>
      amount > resources[resource].amount
        ? (isDisabled = true)
        : (isDisabled = false)
    );
    return isDisabled;
  };

  render() {
    const { research } = this.props;
    const researchItems = Object.keys(research);
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column computer={"14"} tablet={"14"}>
            {researchItems.map(researchItem =>
              research[researchItem].map((research, idx) => {
                return (
                  !research.bought &&
                  research.unlocked.value && (
                    <ResearchItem
                      key={`${research.title}-${idx}`}
                      {...research}
                      disabled={this.isResearchDisabled(research.costs)}
                      clickButtonFunc={() => this.researchItem("clicking", idx)}
                    />
                  )
                );
              })
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

const mapStateToProps = ({ gameData }) => ({ research: gameData.researches });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Research);
