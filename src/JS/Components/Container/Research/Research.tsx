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
import {
  GameData,
  Researches,
  ResearchItems,
  Costs
} from "../../../TypeScriptTypes/types";

interface Props {
  research: Researches;
  actions: any;
  itemOneState: GameData;
}

class Research extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  researchItem = (research: string, idx: number) =>
    this.props.actions.researchItem({ research, idx });

  isResearchDisabled = (cost: Array<Costs>) => {
    const { resources } = this.props.itemOneState;
    const result = cost.map(
      cost => cost.amount > resources[cost.resource].amount
    );
    return _.includes(result, true);
  };

  render() {
    const { research } = this.props;
    const researchItems = Object.keys(research);
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column computer={"14"} tablet={"14"}>
            {researchItems.map(researchItem =>
              research[researchItem].map(
                (researchCat: ResearchItems, idx: number) => {
                  const value = !_.some(researchCat.unlocked, { value: false });
                  const isDiabled =
                    value && this.isResearchDisabled(researchCat.costs);
                  return (
                    value &&
                    !researchCat.bought && (
                      <ResearchItem
                        key={`${researchCat.title}-${idx}`}
                        {...researchCat}
                        disabled={isDiabled}
                        clickButtonFunc={() =>
                          this.researchItem(researchItem, idx)
                        }
                      />
                    )
                  );
                }
              )
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
