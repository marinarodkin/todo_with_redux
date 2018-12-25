import React, { Component } from 'react';

import '../App.css';

class TodoForm extends Component {
  render() {

    return (
      <div className="form">
        <form onSubmit={this.props.onSubmitForm} >
            <input className = 'input-task'
                   type = "text"
                   value = {this.props.text}
                   onChange = {this.props.onChange}
                   placeholder = 'Добавьте новое задание'
                   autoFocus = {true}
                   ref = {this.props.textInput}
                   />
        </form>

      </div>
    );
  }
}

export default TodoForm;
