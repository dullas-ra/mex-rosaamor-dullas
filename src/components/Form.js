import React, { useState } from "react";

const Form = (props) => {
    

    const [validation, setValidation] = useState('valid')

    const inputTextHandler = (e) => {
        props.setInputText(e.target.value)
    }

    const createNewTodo = todo => {

        const options = {
          method: 'POST',
          body: JSON.stringify(todo),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }
        fetch(props.apiUrl, options)
        .then(res => res.json())
        .catch(err => console.error(err))

        return props.fetchRefresh();
        
    }
    
    const submitTodoHandler = (e) => {
        e.preventDefault()
        if(validationHandler(props.inputText) !== 'valid'){
            setValidation(validationHandler(props.inputText))
        }else{
            const newTodo = {name: props.inputText, completed: false,id: Math.random() * 1000}
            props.setTodos([
            ...props.todos, newTodo
            ])
            createNewTodo(newTodo)
            props.setInputText("")
            setValidation('valid')
        }
    }

    const statusHandler = (e) => {
        props.setStatus(e.target.value)
    }

    const validationHandler = (input) => {
        if(input.trim() === ''){
            return 'Task Name is Required'
        }
        if(/[^a-zA-Z@ -]/.test(input)){
            return 'Invalid Characters';
        }
        if(input.trim().length < 3){
            return 'Task Name needs to be at least three characters'
        }

        return 'valid'
    }
   
    return (

        <div className="form-container">
            <form className="add-form" autoComplete="off">
                    <input id='task-name' value={props.inputText} onChange={inputTextHandler} 
                    type="text" className="todo-input" maxLength="16"/>
                <button onClick={submitTodoHandler} className="todo-button" type="submit">
                    <i className="fas fa-plus-square"></i>
                </button>
                <div className="select">
                    <select onChange={statusHandler} name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>
            {validation !== 'valid' ?<h3 className="error-message">{`Error: ${validation}`}</h3> :''}
        </div> 
    )
}

export default Form