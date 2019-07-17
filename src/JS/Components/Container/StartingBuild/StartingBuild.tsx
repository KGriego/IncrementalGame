/* Library Imports */
import * as React from "react";
import { Grid } from "semantic-ui-react";

/* Redux Imports */
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/initialActions";
import * as researchActions from "../../../Store/Actions/researchActions";
import { actions as notifyActions } from "../../../Store/Module/Notifications";

/* Component Imports */
import { Resource } from "../../Presentational/Resource";
import { Building } from "../../Presentational/Building";
import { canBuy } from "../../../Utils/helpers";
import { GameData } from "../../../TypeScriptTypes/types";

interface Props {
  itemOneState: GameData;
  actions: any;
  notify: any;
}

class StartingBuild extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  addItemOne = () => {
    const { itemOneState, actions, notify } = this.props;
    const { resources, buildings, stats } = itemOneState;
    if (resources.itemOne.amount + 1 > resources.itemOne.limit) {
      notify.notifyWarning("You have reached the limit.");
    } else {
      actions.addItemOne();
      if (!buildings.buildingOne.unlocked && resources.itemOne.amount > 19) {
        actions.unlockBuildingOne();
      }
      if (stats.clicks === 19) {
        actions.checkResearch();
      }
    }
  };
  refineItemOne = (resource = "") => {
    const { itemOneState, actions, notify } = this.props;
    const { resources } = itemOneState;

    if (resources.refinedItemOne.amount > resources.refinedItemOne.limit) {
      notify.notifyWarning("You have reached the limit.");
    }

    if (!canBuy(resources.refinedItemOne, resources)) {
      actions.refineItemOne(resource);
    } else {
      notify.notifyWarning("You don't have enough to make this resource.");
    }
  };
  addBuildingOne = (building = "") => {
    const { itemOneState, actions, notify } = this.props;
    const { resources, buildings } = itemOneState;

    //if we have enough resources
    if (!canBuy(buildings.buildingOne, resources)) {
      //buy the building
      actions.addBuilding(building);
      //if this is our first building, start the ticking
      if (buildings[building].amount === 0) {
        actions.startTicking();
      }
    } else {
      //we don't thave enough resources to buy the building
      notify.notifyWarning("You don't have enough to buy this building.");
    }
  };

  render() {
    const { itemOneState } = this.props;

    const { resources, buildings } = itemOneState;

    const buildingKeys = Object.keys(buildings);
    const resourceKeys = Object.keys(resources);
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column computer={"14"} tablet={"14"} mobile={"13"}>
            {resourceKeys.map((key, idx) => {
              return (
                resources[key].unlocked && (
                  <Resource
                    key={`${key}+${idx}`}
                    {...resources[key]}
                    clickButtonFunc={() => this[resources[key].add](key)}
                    disabled={canBuy(resources[key], resources)}
                  />
                )
              );
            })}
            {buildingKeys.map(
              (key, idx) =>
                buildings[key].unlocked && (
                  <Building
                    key={`${key}+${idx}`}
                    {...buildings[key]}
                    clickButtonFunc={() => this.addBuildingOne(key)}
                    disabled={canBuy(buildings[key], resources)}
                  />
                )
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ ...actions, ...researchActions }, dispatch),
  notify: bindActionCreators({ ...notifyActions }, dispatch)
});

const mapStateToProps = (state: any) => ({
  itemOneState: state.gameData,
  root: { ...state }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartingBuild);
