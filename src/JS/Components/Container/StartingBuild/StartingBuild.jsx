/* Library Imports */
import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

/* Redux Imports */
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/initialActions";
import * as notify from "../../../Store/Module/Notifications";

/* Component Imports */
import { Resource } from "../../Presentational/Resource";
import { Building } from "../../Presentational/Building";
import { isDisabled } from "../../../Utils/helpers";

class StartingBuild extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addItemOne = () => {
    const { itemOneState, actions, notify } = this.props;
    const { resources, unlocked, limits } = itemOneState;
    if (resources.itemOne + 1 > limits.itemOne) {
      notify.notifyWarning("You have reached the limit.");
    } else {
      actions.addItemOne();
      if (!unlocked.buildingOne && resources.itemOne > 19) {
        actions.unlockBuildingOne();
      }
    }
  };
  refineItemOne = () => {
    const { itemOneState, actions, notify } = this.props;
    const { resources, costs, limits } = itemOneState;
    if (costs.resources.refinedItemOne <= resources.itemOne) {
      actions.refineItemOne();
    } else if (resources.refinedItemOne > limits.refinedItemOne) {
      notify.notifyWarning("You have reached the limit.");
    } else {
      notify.notifyWarning("You don't have enough to make this resource.");
    }
  };
  addBuildingOne = () => {
    const { itemOneState, actions, notify } = this.props;
    const { resources, costs, buildings } = itemOneState;
    if (resources.itemOne > costs.buildings.buildingOne) {
      actions.addBuilding(costs.buildings.buildingOne);
      if (buildings.buildingOne === 0) {
        actions.startTicking();
      }
    } else {
      notify.notifyWarning("You don't have enough to buy this building.");
    }
  };

  render() {
    const { itemOneState } = this.props;
    const { resources, costs, buildings, unlocked } = itemOneState;
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column computer={"14"} tablet={"14"} mobile={"13"}>
            <Resource
              title={"Item 1"}
              amount={resources.itemOne}
              clickButtonFunc={this.addItemOne}
              disabled={false}
              text={"Add Item 1"}
            />
            <Resource
              title={"Refine Item 1"}
              amount={resources.refinedItemOne}
              clickButtonFunc={this.refineItemOne}
              disabled={isDisabled(resources.itemOne, resources.refinedItemOne)}
              cost={`${resources.refinedItemOne} itemOnes`}
              text={"Refine Item 1"}
            />
            {unlocked.buildingOne && (
              <Building
                title={"Building 1"}
                amount={buildings.buildingOne}
                clickButtonFunc={this.addBuildingOne}
                cost={costs.buildings.buildingOne}
                disabled={isDisabled(
                  resources.itemOne,
                  costs.buildings.buildingOne
                )}
                text={"Add Building 1"}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  notify: bindActionCreators(notify, dispatch)
});

const mapStateToProps = state => ({ itemOneState: state.initialReducer });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartingBuild);
