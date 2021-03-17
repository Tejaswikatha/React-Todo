import React, { Component } from "react";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  withStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import { completeTask, addEditTask, deleteTask } from "./store/actions";

class TaskItem extends Component {
  constructor(props) {
    super(props);
    const { task } = this.props;
    this.state = {
      completed: !!task.completed,
      value: task.name,
      editMode: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.task) !== JSON.stringify(this.props.task)) {
      const { task } = this.props;
      this.setState({
        completed: !!task.completed,
        value: task.name,
        editMode: false,
      });
    }
  }

  changeStatus = () => {
    const { completed } = this.state;
    this.setState({ completed: !completed });
    this.props.completeTask({
      item: { ...this.props.task, completed: !completed },
      item_index: this.props.item_index,
    });
  };

  saveOrEdit = () => {
    const { editMode, value } = this.state;
    const { task, item_index } = this.props;
    if (!!editMode && task.name !== value) {
      this.props.addEditTask({ item: { ...task, name: value }, item_index });
    }
    this.setState({
      editMode: !editMode,
    });
  };

  cancelOrDelete = () => {
    const { editMode } = this.state;
    const { item_index } = this.props;
    if (!editMode) {
      this.props.deleteTask({ item_index });
    } else {
      this.setState({
        editMode: !editMode,
      });
    }
  };

  changeValue = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  keyPress = (e) => {
    if (e.key === "Enter") {
      this.saveOrEdit();
      e.preventDefault();
    }
  };

  render() {
    const { completed, value, editMode } = this.state;
    return (
      <div>
        <div style={{ marginBottom: 10 }}>
          {!!editMode ? (
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              onChange={this.changeValue}
              value={value}
              onKeyPress={this.keyPress}
            />
          ) : (
            <FormControlLabel
              control={
                <Checkbox
                  checked={completed}
                  onChange={this.changeStatus}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label={value}
            />
          )}
        </div>
        <div className="buttonGroup">
          <div className="buttonDiv" onClick={this.saveOrEdit}>
            {!!editMode ? "Save" : "Edit"}
          </div>
          <div
            className="buttonDiv"
            style={{ backgroundColor: "#ca3c3c", borderColor: "#bd2130", color: "white" }}
            onClick={this.cancelOrDelete}
          >
            {!!editMode ? "Cancel" : "Delete"}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { completeTask, addEditTask, deleteTask })(
  TaskItem
);
