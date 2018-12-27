import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import {actSetToDoDone, actStartEditing, actFinishEditing, actDeleteTask, actChangeInputValue} from "./../reducers/actions_creators.js"

class TodoList extends Component {
    labelStyle(item) {
        return item.done ? "task-label_through" : 'task-label';
    }

    onDelete = (id) => (event) => {
        event.preventDefault(event);
        this.props.actDeleteTask(id)
    }

    startEditing = (id) => (event) => {
        event.preventDefault(event);
        this.props.actStartEditing(id)
    }

    finishEditing= (id) => (event) => {
        event.preventDefault(event);
        this.props.actFinishEditing(id)
    }

    setToDoDone = (e) => {
        const id = e.target.id;
        this.props.actSetToDoDone(id);
    }

    render() {
        const tasksCopy  = [...this.props.app.tasks];
        return (
            <div className="tasks">
                <form>
                    {tasksCopy.map(item =>
                        item.isEdited  ?
                            (<div className="form edit-form" key = {item.id}>
                                <form onSubmit = {this.finishEditing(item.id)} >
                                    <input className = 'input-task'
                                           type = "text"
                                           value = {this.props.app.text}
                                           onChange = {this.props.actChangeInputValue}
                                           placeholder = {item.content}
                                           autoFocus = {true}
                                           ref = {this.props.textInput}
                                           onBlur={this.finishEditing(item.id)}

                                    />
                                    <button type = "submit" className = "task-button task-button_done" onClick = {this.finishEditing(item.id)}>
                                    </button>
                                </form>
                            </div>) :
                            (<div className="task" key = {item.id} >
                                <label className = {this.labelStyle(item)} htmlFor = {item.id}>
                                    <input
                                        className = "task-check"
                                        type = 'checkbox'
                                        id = {item.id}
                                        checked = {item.done}
                                        onChange = {this.setToDoDone}
                                    />
                                    {item.content}
                                </label>
                                <div>
                                    <button className = "task-button task-button_edit" onClick = {this.startEditing(item.id)}>
                                    </button>
                                    <button className = "task-button task-button_delete" onClick = {this.onDelete(item.id)}>
                                    </button>
                                </div>
                            </div>)  )
                    }
                </form>
            </div>
        );
    }
}
// приклеиваем данные из store
const mapStateToProps = store => {
    return {
        user: store.user,
        app: store.app,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actDeleteTask: payload => dispatch(actDeleteTask(payload)),
        actStartEditing: payload => dispatch( actStartEditing(payload)),
        actFinishEditing: payload => dispatch(actFinishEditing(payload)),
        actSetToDoDone: payload => dispatch(actSetToDoDone(payload)),
        actChangeInputValue: payload => dispatch( actChangeInputValue(payload))
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

