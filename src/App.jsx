import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo , editTodo } from './config/redux-config/reducers/todoslice';

const App = () => {
  const todoRef = useRef();
  
  
  const dispatch = useDispatch();
  
 
  const todos = useSelector(state => state.todos);

  const addTodoReducer = (event) => {
    event.preventDefault();
    const todoValue = todoRef.current.value;

    console.log(todoValue);
    dispatch(addTodo({
      title: todoValue,
    }));

    console.log(todos);
    todoRef.current.value = '';
  };

  const deleteTodo = (index) => {
    dispatch(removeTodo({
      index: index
    }));
  };

  const editItemFromRedux = (index) => {
    console.log("Edit Item", index);
    const editVal = prompt("Enter Todo");
    if (editVal) {
      dispatch(editTodo({
        index,
        title: editVal
      }));
    }
  };

  return (
    <>
      <h1>Todo</h1>
      <form onSubmit={addTodoReducer}>
        <input type="text" placeholder='Todo' ref={todoRef} />
        <br /><br />
        <button type='submit'>Add Todo</button>
      </form>
      <br /><br />
      

      <ul>
        {todos.map((item, index) => (
          <li key={item.id}>
            {item.title}
            <br />
            <button onClick={() => deleteTodo(index)}>Delete</button>
            <button onClick={() => editItemFromRedux(index)}>Edit</button>
          </li>
        ))}
      </ul>
      
    </>
  );
};

export default App;
