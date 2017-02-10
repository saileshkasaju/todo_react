import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo} from './lib/TodoHelpers';
import {pipe, partial} from './lib/utils';

class App extends Component {
  state = {
    todos: [
      {id: 1, name: 'Learn JSX', isCompleted: true},
      {id: 2, name: 'Build an Awesome App', isCompleted: false},
      {id: 3, name: 'Ship it!', isCompleted: false}
    ],
    currentTodo: '',
    errorMessage: ''
  };

  handleInputChange = (e) => {
    this.setState({currentTodo: e.target.value});
  };

  handleToggle = (id) => {
    // const todo = findById(id, this.state.todos);
    // const toggledTodo = toggleTodo(todo);
    // const updatedTodos = updateTodo(this.state.todos, toggledTodo)
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    // const updatedTodos = updateTodo(this.state.todos, toggledTodo)
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    this.setState({todos: updatedTodos})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isCompleted: false}
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    });      
  }; 

  handleEmptySubmit = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: 'Please submit a todo name'
    })
  }

  render() {
    const { todos, currentTodo } = this.state;
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage&& <span className='error'>{this.state.errorMessage}</span>}
          <TodoForm handleInputChange={this.handleInputChange}
            currentTodo={currentTodo}
            handleSubmit={submitHandler}
            > </TodoForm>
          <TodoList handleToggle={this.handleToggle} todos={todos}> </TodoList>          
        </div>
      </div>
    );
  }
}

export default App;
