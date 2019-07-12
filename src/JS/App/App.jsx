/* Library Imports */
import React, { Component } from "react";
import NotificationSystem from "react-notification-system";
import { Grid } from "semantic-ui-react";

/* Redux Imports */
import { connect } from "react-redux";

/* Component Imports */
import Home from "../Components/Container/Home";

/* Style Imports */
import "semantic-ui-css/semantic.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.notifications.notification &&
      nextProps.notifications.notification !==
        this.props.notifications.notification
    ) {
      this.notificationSystem.addNotification(
        nextProps.notifications.notification
      );
    }
  }
  render() {
    return (
      <Grid centered>
        <Grid.Row>
          <Home />
        </Grid.Row>

        <NotificationSystem
          allowHTML
          ref={c => {
            this.notificationSystem = c;
          }}
        />
      </Grid>
    );
  }
}

const mapStateToProps = ({ notifications }) => ({ notifications });

export default connect(mapStateToProps)(App);
