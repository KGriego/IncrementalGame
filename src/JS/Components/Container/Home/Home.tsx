/* Library Imports */
import * as React from "react";
import { Grid, Tab } from "semantic-ui-react";

/* Redux Imports */
import { connect } from "react-redux";

/* Component Imports */
import StartingBuild from "../StartingBuild";
import Research from "../Research";
import { ResourceList } from "../../Presentational/ResourceList/ResourceList";

const Tabs = [
  { menuItem: "Research", render: () => <Research /> },
  { menuItem: "Home", render: () => <StartingBuild /> }
];

interface Props {
  parent: object;
  gameData: object;
}

class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    console.log(props);
    this.state = {};
  }
  render() {
    const { parent = {}, gameData = {} } = this.props;
    return (
      <>
        <Grid.Column computer={"5"} tablet={"14"}>
          <ResourceList {...{ parent, gameData }} />
        </Grid.Column>
        <Grid.Column computer={"9"} tablet={"14"}>
          <Tab menu={{ secondary: true, pointing: true }} panes={Tabs} />
        </Grid.Column>
      </>
    );
  }
}

const mapStateToProps = ({
  parent,
  gameData
}: {
  parent: object;
  gameData: object;
}) => ({
  gameData,
  parent
});

export default connect(mapStateToProps)(Home);
