import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? { title, id, completed } : todo
        );
        setTodos(newTodo);
        setEditTodo("");
    };
    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title)
        } else {
            setInput("")
        }
    }, [setInput, editTodo]);

    const onTaskChange = (event) => {
        setInput(event.target.value);
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!editTodo) {
            setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
            setInput("");
        }
        else {
            updateTodo(input, editTodo.id, editTodo.completed)
        }
    }
    return (
        <form onSubmit={onFormSubmit}>
            <div className="task">
                <h1>Todo List</h1>
                <div className="task-me">
                    <input type="text"
                        placeholder="Enter Todo"
                        className="task-input"
                        value={input}
                        required
                        onChange={onTaskChange}
                    />
                    <button className="button-add" type="submit" >
                        {editTodo ? "OK" : "Add"}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Form;