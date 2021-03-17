import React, { Component } from "react";
import { ACTIVE, ALL, COMPLETED } from "./store/types";
import { connect } from "react-redux";
import TaskItem from "./TaskItem";
import { Typography } from "@material-ui/core";

export const styles = () => ({
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  buttonDiv: {
    flexGrow: 1,
    flexBasis: 1,
    border: "0.5px solid black",
    padding: 5,
    margin: 5,
  },
});

class ListOfTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        { name: "All", value: ALL },
        { name: "Active", value: ACTIVE },
        { name: "Completed", value: COMPLETED },
      ],
      selected: ALL,
    };
  }

  changeSelected = (selected) => {
    if (selected !== this.state.selected) {
      this.setState({
        selected,
      });
    }
  };

  get tasks() {
    const { tasks } = this.props;
    const { selected } = this.state;
    return tasks.filter((item) =>
      selected === ACTIVE
        ? !item.completed
        : selected === COMPLETED
        ? !!item.completed
        : true
    );
  }

  render() {
    const { buttons, selected } = this.state;
    const tasks = this.tasks;
    return (
      <div style={{ width: "100%" }}>
        <div className="buttonGroup">
          {buttons.map((buttonItem, ind) => (
            <div
              className="buttonDiv"
              style={{
                backgroundColor:
                  selected === buttonItem.value ? "black" : "white",
                color: selected === buttonItem.value ? "white" : "black",
              }}
              key={`button_${ind}`}
              onClick={() => this.changeSelected(buttonItem.value)}
            >
              {buttonItem.name}
            </div>
          ))}
        </div>
          <div style={{ margin: 5 }}>
            <Typography variant="h4">{tasks.length} task(s) remaining</Typography>
          </div>
        <div style={{ margin: 5 }}>
          {tasks.map((task, index) => (
            <TaskItem key={`task_${index}`} task={task} item_index={index} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (toDoReducer) => {
  const { tasks = [] } = toDoReducer;
  return { tasks };
};

export default connect(mapStateToProps)(ListOfTasks);
