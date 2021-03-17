import React from "react";
import { Provider } from "react-redux";
import AddTask from "./AddTask";
import "./App.css";
import { store } from "./store";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = () => ({
  root: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Provider store={store}>
        <div className={classes.root}>
          <div style={{minWidth: 500}}>
            <Card>
              <CardContent >
                <AddTask />
              </CardContent>
            </Card>
          </div>
        </div>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
