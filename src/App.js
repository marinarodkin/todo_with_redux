import React, {Component} from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';
import { connect } from 'react-redux';


class App extends Component {

       render() {
        return (
            <div className="App">
                <div className='header'>
                    <p className='header-title'>To do list</p>
                </div>
                <TodoForm   />
                <TodoList   />
            </div>
        );
    }
}

export default App


