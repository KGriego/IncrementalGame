/* Library Imports */
import React, { Component } from "react";

/* Redux Imports */
import { connect } from "react-redux";

/* Component Imports */
import StartingBuild from "../StartingBuild";
import Research from "../Research";
import { Grid, Tab } from "semantic-ui-react";
import { ResourceList } from "../../Presentational/ResourceList/ResourceList";

const Tabs = [
  { menuItem: "Home", render: () => <StartingBuild /> },
  { menuItem: "Research", render: () => <Research /> }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { itemOneState } = this.props;
    return (
      <>
        <Grid.Column computer={"5"} tablet={"14"}>
          <ResourceList {...itemOneState} />
        </Grid.Column>
        <Grid.Column computer={"9"} tablet={"14"}>
          <Tab menu={{ secondary: true, pointing: true }} panes={Tabs} />
        </Grid.Column>
      </>
    );
  }
}

const mapStateToProps = state => ({ itemOneState: state.initialReducer });

export default connect(mapStateToProps)(Home);
