import Todo from './Todo'

const TodoList = (props) => {
    const taskNumber = props.filteredList.length
    return (
        <div className="todo-container">
            <h2>{taskNumber > 0 ? taskNumber > 1 ? `${taskNumber} Tasks`
            : `1 Task`
            : "No Task Yet"}</h2>
            <ul className="todo-list">
                {props.filteredList.map(todo => (
                    <Todo 
                        setTodos={props.setTodos}
                        todos={props.todos}
                        todo={todo}
                        key={todo.id} 
                        text={todo.name}
                        isEditing = {props.isEditing}
                        setIsEditing = {props.setIsEditing}
                        apiUrl = {props.apiUrl}
                        fetchRefresh={props.fetchRefresh}/>
                ))}
            </ul>
        </div>
    )
}

export default TodoList