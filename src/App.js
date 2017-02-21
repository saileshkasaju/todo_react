import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/TodoHelpers';
import {pipe, partial} from './lib/utils';
import {loadTodos, createTodo} from './lib/TodoService';

class App extends Component {
  state = {
    todos: [],
    currentTodo: '',
    errorMessage: ''
  };
  
  static contextTypes = {
    route: React.PropTypes.string
  };

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }
  
  
  handleInputChange = (e) => {
    this.setState({currentTodo: e.target.value});
  };

  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos: updatedTodos})
  };

  handleToggle = (id) => {
    // const todo = findById(id, this.state.todos);
    // const toggledTodo = toggleTodo(todo);
    // const updatedTodos = updateTodo(this.state.todos, toggledTodo)
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    // const updatedTodos = updateTodo(this.state.todos, toggledTodo)
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    this.setState({todos: updatedTodos})
  };

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
    createTodo(newTodo)
      .then(() => console.log('Todo added'));
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
    const displayTodos = filterTodos(todos, this.context.route);
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
          <TodoList handleToggle={this.handleToggle}
            todos={displayTodos}
            handleRemove={this.handleRemove}> </TodoList>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
