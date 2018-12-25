import React, { Component } from 'react';
import '../App.css';


class TodoList extends Component {
    labelStyle(item) {
       return item.done ? "task-label_through" : 'task-label';
    }
  render() {
    const tasksCopy  = [...this.props.tasks];
    tasksCopy.sort((a,b) => b.index - a.index);
    return (
      <div className="tasks">
        <form>
        {tasksCopy.map(item =>
            (<div className="task" key = {item.id} >
               <label className = {this.labelStyle(item)} htmlFor = {item.index}>
                <input
                    className = "task-check"
                    type = 'checkbox'
                    id = {item.index}
                    checked = {item.done}
                    onChange = {this.props.onClick}

                     />
                {item.content}
                </label>
                <div>
                  <button className = "task-button task-button_edit" onClick = {this.props.editTask}>
                  </button>
                  <button className = "task-button task-button_delete" onClick = {this.props.deleteTask}>
                  </button>
                </div>
            </div>) )
        }
        </form>
      </div>
    );
  }
}

export default TodoList;
