import React, {Component} from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import {actDeleteTask} from "./reducers/actions_creators.js"




class App extends Component {

    state = {
        tasks: [{content: 'Read 30 pages from the book', done: false, id: uuidv4(), isEdited: false},
            {content: 'Write a letter', done: false, id: uuidv4(), isEdited: false},
            {content: 'Prepare for tomorrow', done: true, id: uuidv4(), isEdited: false}
        ],
        text: '',

    };

    onChangeInputValue = ({target: {value}}) => {
        this.setState({
            text: value
        })
    }

    setToDoDone = ({target: {id}}) => {
        const tasksCopy = [...this.state.tasks];
        const clickedTaskIndex = tasksCopy.findIndex((item => item.id === id))
        tasksCopy[clickedTaskIndex].done = !tasksCopy[clickedTaskIndex].done;
        this.setState(prevState => ({...prevState, tasks: tasksCopy }) )
    }

    addNewTask = () => {
        if (this.state.text === "") return;
        const newTask = {content: this.state.text, done: false, id: uuidv4()};
        this.setState(prevState => ({
            tasks: [newTask, ...prevState.tasks],
            text: '',
        }));
    }

    onDeleteTask = (id) => {
        this.setState(prevState => ({ tasks: prevState.tasks.filter(item => item.id !== id) }))
    }

    startEditing = (id) => {
        const tasksCopy = [...this.state.tasks];
        const clickedTaskIndex = tasksCopy.findIndex((item => item.id === id));
        tasksCopy[clickedTaskIndex].isEdited = !tasksCopy[clickedTaskIndex].isEdited;
        const content = tasksCopy[clickedTaskIndex].content;
        this.setState(prevState => ({...prevState,
            text: content,
            tasks: tasksCopy }));
    }

    finishEditing = (id) => {
        if (this.state.text === "") return;
        const tasksCopy = [...this.state.tasks];
        const clickedTaskIndex = tasksCopy.findIndex((item => item.id === id));
        tasksCopy[clickedTaskIndex].content = this.state.text;
        tasksCopy[clickedTaskIndex].isEdited = !tasksCopy[clickedTaskIndex].isEdited;
        this.setState(prevState => ({...prevState,
            text: "",
            tasks: tasksCopy,
            contentToEdit: ""}));
    }




    render() {
        return (
            <div className="App">
                <div className='header'>
                    <p className='header-title'>To do list</p>
                </div>
                <TodoForm addNewTask={this.addNewTask} tasks = {this.state.tasks} onChangeInputValue={this.onChangeInputValue} text={this.state.text} />
                <TodoList tasks={this.state.tasks} onDeleteTask={this.onDeleteTask} onEditTask={this.onEditTask}
                          setToDoDone={this.setToDoDone}  startEditing={this.startEditing} finishEditing={this.finishEditing} onChangeInputValue={this.onChangeInputValue} text={this.state.text}/>
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
        actDeleteTask: payload => dispatch(actDeleteTask(payload))

    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)


