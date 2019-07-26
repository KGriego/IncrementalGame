/* Library Imports */
import * as React from "react";
import * as NotificationSystem from "react-notification-system";
import { Grid } from "semantic-ui-react";

/* Redux Imports */
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import * as actions from "../Store/Actions/saveActions";
import * as initialActions from "../Store/Actions/initialActions";

/* Component Imports */
import Home from "../Components/Container/Home";

/* Style Imports */
import "semantic-ui-css/semantic.min.css";

interface Props {
  notifications: NotificationType;
  actions: {
    saveGame: any;
    startTicking: any;
  };
}

interface NotificationType {
  notification: any;
}

class App extends React.Component<Props> {
  private notificationSystem: any;

  static defaultProps: Props = {
    actions: { saveGame: () => {}, startTicking: () => {} },
    notifications: { notification: null }
  };
  state = {};

  componentDidMount() {
    this.saveGame();
    this.props.actions.startTicking();
  }

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

  saveGame = () =>
    setInterval(() => {
      console.log("saving game");
      this.props.actions.saveGame();
    }, 10000);

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ ...actions, ...initialActions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
