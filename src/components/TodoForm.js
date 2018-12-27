import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../App.css';
import {actAddNewTask, actChangeInputValue} from "./../reducers/actions_creators.js"

class TodoForm extends Component {
    addNewTask  = (event) => {
        event.preventDefault(event);
        this.props.actAddNewTask();
    }
    render() {

        return (
            <div className="form">
                <form onSubmit={this.addNewTask} >
                    <input className = 'input-task'
                           type = "text"
                           value = {this.props.app.tasks.findIndex(item => item.isEdited === true) === -1 ? this.props.app.text : ''}
                           onChange = {this.props.actChangeInputValue}
                           placeholder = 'Добавьте новое задание'
                           autoFocus = {true}
                           ref = {this.props.textInput}
                           onBlur={this.addNewTask}
                    />
                    <button type = "submit" className = "task-button task-button_done" onClick = {this.addNewTask}>
                    </button>
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
       actAddNewTask: payload => dispatch(actAddNewTask(payload)),
        actChangeInputValue: payload => dispatch( actChangeInputValue(payload))
         }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoForm)


