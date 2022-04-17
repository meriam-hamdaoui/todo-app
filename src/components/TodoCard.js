import React, { useRef } from "react";
import { connect } from "react-redux";
import { removeTodos, editTodos, completeTodos } from "../reduxFiles/reducer";

//the mapStateToProps returns a state & pass it to the component
const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

//the mapDispatchToProps returns an action & pass it to the component
//and allow the component to sent messages to the store for updates
const mapDispatchToProps = (dispatch) => {
  return {
    removeTodo: (id) => dispatch(removeTodos(id)),
    editTodo: (obj) => dispatch(editTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};

const TodoCard = ({ todoItem, removeTodo, editTodo, completeTodo }) => {
  //useRefn allows us to persist values between renders. for the edit function
  const inputRef = useRef(true);

  //make our textarea editable on click edit button
  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  // function to update the todo item
  const edit = (id, value, e) => {
    if (e.which === 13) {
      //equivalent to if(e.key === "Enter")
      //which 13 is a key code for Enter
      editTodo({ id, todoItem: value });
      inputRef.current.disabled = true;
    }
  };

  return (
    <li key={todoItem.id} className="card">
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={todoItem.item}
        onKeyPress={(e) => edit(todoItem.id, inputRef.current.value, e)}
      />
      <div className="btns">
        <button onClick={() => changeFocus()}>Edit</button>
        <button onClick={() => completeTodo(todoItem.id)}>Complete</button>
        <button onClick={() => removeTodo(todoItem.id)}>Delete</button>
      </div>
      {todoItem.completed && <span className="completed">done</span>}
    </li>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard);
