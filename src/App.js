import React, {Component} from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux'



class App extends Component {

    state = {
        tasks: [{content: 'Read 30 pages from the book', done: false, index: 1, id: uuidv4()},
            {content: 'Write a letter', done: false, index: 2, id: uuidv4()},
            {content: 'Prepare for tomorrow', done: true, index: 3, id: uuidv4()}
        ],
        text: '',
        currentIndex: 3
    };

    constructor(props) {
        super(props);
        // создание ссылки для хранения DOM-элемента textInput
        this.textInput = React.createRef();

    }

    onChange = ({target: {value}}) => {
        this.setState({
            text: value
        })
    }

    onClick = ({target: {id}}) => {
        const tasksCopy = [...this.state.tasks];
        const clickedTask = tasksCopy.find((item => item.index == id))
        const updatedTask = {content: clickedTask.content, done: !clickedTask.done, index: clickedTask.index, id: clickedTask.id};
        this.setState(prevState => ({tasks: [...prevState.tasks.filter(item => item.index != id),updatedTask ]}) )
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const index = this.state.currentIndex;
        const newTask = {content: this.state.text, done: false, index: index + 1, id: uuidv4()};
        this.setState(prevState => ({
            tasks: [...prevState.tasks, newTask],
            text: '',
            currentIndex: prevState.currentIndex + 1
        }));
    }

    deleteTask = (e) => {
        e.preventDefault();
        const id = e.target.parentNode.previousSibling.firstChild.id;
        this.setState(prevState => ({ tasks: prevState.tasks.filter(item => item.index != id) }))
    }

    editTask = (e) => {
        e.preventDefault();
        const id = e.target.parentNode.previousSibling.firstChild.id;
        const tasksCopy = [...this.state.tasks];
        const clickedTask = tasksCopy.find(item => item.index == id);
        const updatedContent = clickedTask.content;
        this.textInput.current.focus();
        this.setState(prevState => ({ tasks: prevState.tasks.filter(item => item.index != id), text: updatedContent }))
    }

    render() {
        return (
            <div className="App">
                <div className='header'>
                    <p className='header-title'>To do list</p>
                </div>
                <TodoForm onSubmitForm={this.onSubmitForm} onChange={this.onChange} text={this.state.text} textInput = {this.textInput}/>
                <TodoList tasks={this.state.tasks} deleteTask={this.deleteTask} editTask={this.editTask}
                          onClick={this.onClick}/>
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

    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)


