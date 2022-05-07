import React from 'react';
import {useState, useEffect} from 'react';
import './App.css'

import Header from './components/Header'
import Form from './components/Form'
import ToDoList from './components/ToDoList'

  
function App() {
  
  const apiUrl = 'http://localhost:3000/api/todo';

  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("all");
  const [filteredList, setFilteredList] = useState([])
  const [isEditing, setIsEditing] = useState(null)
  const [isGetting, setIsGetting] = useState(true)
  const [isRefreshed, setIsRefreshed] = useState(false)

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);



  const database = [
    {
      username: "admin",
      password: "admin1234"
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  useEffect(() => {
    
    if(isRefreshed === false)
    {
      fetch(apiUrl).then(res => {
        return res.json();
      }).then(r => {
        setTodos(r)
      })


    }
    
  },[isGetting])

  useEffect(() => {
    filterHandler()
  },[todos,status])

  useEffect(() =>{
    removeIsEditing()
  },[todos,status,inputText])


  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredList(todos.filter(todo => todo.completed === true))
        break;
      case "uncompleted":
        setFilteredList(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredList(todos);
        break;
    }
  }

  const removeIsEditing = () =>{
    setIsEditing(null);
  }

  const fetchRefresh = () => {
    setIsRefreshed(false)
    setIsGetting(true)
    setIsRefreshed(true)
    setIsGetting(false)
    
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    var { uname, pass } = document.forms[0];

    const userData = database.find((user) => user.username === uname.value);


    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }

  };


  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


 const renderForm = (
  <div className="form"> 
    <form onSubmit={handleSubmit}>
    <div className='logheader'>
      <header><b>TODO</b></header>
      </div>
      <div className="user-container">
        <label><b>Username</b></label>
        <input type="text" name="uname" required />
        {renderErrorMessage("uname")}
      </div>
      <div className="password-container">
        <label><b>Password</b></label>
        <input type="password" name="pass" required />
        {renderErrorMessage("pass")}
      </div>
      <div className="button-container">
        <input type="submit" value="Login" />
      </div>


      
    </form>
    

  </div>
);


  return (
    <div className="App">
      <div className="login-form"> 
        {isSubmitted ?  <div>
         
          <Header />
      
      

      <Form inputText={inputText} setInputText={setInputText} 
      todos={todos} setTodos={setTodos}
      setStatus={setStatus}
      apiUrl={apiUrl}
      fetchRefresh={fetchRefresh}
      />
      <ToDoList setTodos={setTodos} todos={todos}
       filteredList={filteredList}
       isEditing={isEditing} setIsEditing={setIsEditing}
       apiUrl = {apiUrl} 
       fetchRefresh={fetchRefresh}
       />

    
     
        </div>:renderForm}
        
  </div>
     </div>
      
  );
}

export default App;
