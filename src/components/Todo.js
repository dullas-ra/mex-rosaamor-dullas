import {useState, useEffect} from 'react'

const Todo = (props) => {
    
    const [editInputText, setEditInputText] = useState("");

    useEffect(() => {
        changeEditInputState()
    },[props.isEditing])


    const updateTodo = (todo,m) => {
        const options = {
          method: m,
          body: JSON.stringify(todo),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }
        fetch(props.apiUrl, options)

        return props.fetchRefresh()
    }

    const deleteHandler = () =>{
        props.setTodos(props.todos.filter((e) => e.id !== props.todo.id))
        const itemToBeDeleted = {id: props.todo.id}
        updateTodo(itemToBeDeleted,"DELETE")
    }

    const completeHandler = () => {
        props.setTodos(props.todos.map(i => {
            if(i.id === props.todo.id){
                const itemToBeUpdated = {name: i.name, completed: !i.completed, id: i.id}
                updateTodo(itemToBeUpdated,"PUT")
                return{
                    ...i, completed: !i.completed
                }
            }
            return i
        }))
    }

    const cancelHandler = () =>{
        props.setIsEditing(null)
    }

    const editInputHandler = (e) => {
        setEditInputText(e.target.value)
    }

    const editHandler = () => {
        props.setIsEditing(props.todo.id)
    }

    const submitEditHandler = (e) =>{
        props.setTodos(props.todos.map(i => {
            if(i.id === props.todo.id){
                const itemToBeUpdated = {name: editInputText, completed: i.completed, id: i.id}
                updateTodo(itemToBeUpdated,"PUT")
                return{
                    ...i, name: editInputText
                }
            }
            return i
        })
        )
        e.preventDefault()

    }

    const changeEditInputState = () =>{
        setEditInputText("")
    }


    if(props.isEditing === props.todo.id){
        return(
            <form action="" className="todo editing">
                <input type="text" placeholder={props.todo.Name} onChange={editInputHandler} 
                maxLength="16" />
                <button onClick={submitEditHandler} className="complete-btn">
                    <i className="fas fa-check"></i>
                </button>
                <button onClick={cancelHandler} className="trash-btn" type="button">
                    <i className="fas fa-ban"></i>
                </button>
            </form>
        )
    }else{
        return (
            <div className="todo">
                <li className={`todo-item ${props.todo.completed ? "completed" : ''}`}>{props.todo.name}</li>
                <button onClick={completeHandler} className="complete-btn">
                    <i className="fas fa-check"></i>
                </button>
                <button onClick={editHandler} className="edit-btn">
                    <i className="fas fa-edit"></i>
                </button>
                <button onClick={deleteHandler} className="trash-btn">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        )
    }
}

export default Todo