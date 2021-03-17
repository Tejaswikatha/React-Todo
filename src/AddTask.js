import React, { Component } from "react";
import ListOfTasks from "./ListOfTasks";
import { Button, Typography, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { addEditTask } from "./store/actions";
import TextField from "@material-ui/core/TextField";

const styles = () => ({
  addTask: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    padding: 10
  },
});

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  changeValue = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  addTask = () => {
    if (!!this.state.value) {
      this.props.addEditTask({ item: { name: this.state.value } });
      this.setState({
        value: "",
      });
    }
  };

  keyPress = (e) => {
    if (e.key === "Enter") {
      this.addTask();
      e.preventDefault();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.addTask}>
        <div style={{margin: 5}}>
        <Typography variant="h5">What needs to be done?</Typography>
        </div>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          style={{ marginBottom: 10 }}
          onChange={this.changeValue}
          value={this.state.value}
          onKeyPress={this.keyPress}
        />
        <Button
          variant="contained"
          fullWidth
          style={{
            color: "white",
            backgroundColor: "black",
            marginBottom: 10,
          }}
          onClick={this.addTask}
        >
          Add
        </Button>
        <ListOfTasks />
      </div>
    );
  }
}

const mapDispatchToProps = {
  addEditTask,
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(AddTask));
