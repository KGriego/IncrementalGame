/* Library Imports */
import * as React from "react";
import * as NotificationSystem from "react-notification-system";
import { Grid } from "semantic-ui-react";

/* Redux Imports */
import { connect } from "react-redux";

/* Component Imports */
import Home from "../Components/Container/Home";

/* Style Imports */
import "semantic-ui-css/semantic.min.css";

interface Props {
  notifications: NotificationType;
}

interface State {}

interface NotificationType {
  notification: any;
}

class App extends React.Component<Props, State> {
  private notificationSystem: any;

  static defaultProps: Props = {
    notifications: { notification: null }
  };

  state: Readonly<State> = {};

  componentWillReceiveProps(nextProps: any) {
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
          ref={(c: any) => (this.notificationSystem = c)}
        />
      </Grid>
    );
  }
}

const mapStateToProps = ({
  notifications
}: {
  notifications: NotificationType;
}) => ({ notifications });

export default connect(mapStateToProps)(App);
