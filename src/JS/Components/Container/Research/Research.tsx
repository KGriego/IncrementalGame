/* Library Imports */
import * as React from "react";
import { Grid } from "semantic-ui-react";
import * as _ from "lodash";

/* Redux Imports */
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/researchActions";

/* Component Imports */
import { ResearchItem } from "../../Presentational/ResearchItem";

/* TypeScript Imports */
import { GameData } from "../../../TypeScriptTypes/types";

interface ResearchActions {
  researchItem({
    research,
    idx
  }: {
    research: string;
    idx: number;
  }): () => object;
}

interface Cost {
  resource: string;
  amount: number | string;
}

interface Props {
  research: any;
  actions: ResearchActions | any;
  itemOneState: GameData | any;
}

class Research extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  researchItem = (research: string, idx: number) => {
    this.props.actions.researchItem({ research, idx });
  };

  isResearchDisabled = (cost: Array<Cost>) => {
    const { resources } = this.props.itemOneState;
    let isDisabled;
    cost.map(({ resource, amount }) => {
      if (resource !== undefined) {
        return amount && amount > resources[resource].amount
          ? (isDisabled = true)
          : (isDisabled = false);
      } else {
        return true;
      }
    });
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
              research[researchItem].map((research: any, idx: number) => {
                const value = _.some(research.unlocked, { value: true });
                return (
                  value &&
                  !research.bought && (
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = ({ gameData }: { gameData: GameData }) => ({
  research: gameData.researches,
  itemOneState: gameData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Research);
