import Header from './components/Header'
import Tasks from './components/Tasks'
import TaskbarButton from './components/TaskbarButton'
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask'
import Login from './components/Login'

var feed = [];
//var objFeed = [];

var wSock = new WebSocket("ws://10.0.0.5:8000/ws/test/");


function App() {
  const name = 'Chad'
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [page, setPage] = useState(-1)
  //const [signedIn, setSignedIn] = useState(false)
  
  // oh god this is disgusting
  useEffect(() =>  {
    const fetchTasks = async () => {
      if(wSock){
        wSock.onopen = async function(event){
          wSock.send("test");
        };
        wSock.onmessage = async function(event){
          feed = await event.data.split("****");
          var newTasks = []
          for(var i = 0; i < feed.length-1; i++){
            feed[i] = await feed[i].split("**")
            await newTasks.push({id:i, text:feed[i][0],
              day:feed[i][1],
              reminder:false, data:feed[i][2]});
          }
          await setTasks(newTasks);
          wSock.close();
          wSock = false;
        }
      }
    }
    fetchTasks();
  })

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !==id))
  }

  const clearTask = () => {
    setTasks([]);
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => 
    task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  const changePage = (pageId) => {
    setPage(pageId);
  }

  const onSignIn = async (credentials) => {
    var wSock = new WebSocket("ws://10.0.0.5:8000/ws/test/");
    if(wSock){
      wSock.onopen = async function(event){
        wSock.send("signin" + credentials[0] + ":" + credentials[1]);
      };
      wSock.onmessage = async function(event){
          var result = await event.data;
        wSock.close();
        wSock = false;
        if(result === 'YES'){
          console.log('welcome');
          await setCreds([credentials[0], credentials[1]]);
          changePage(0);
          return true;
        }
        else{
          console.log('invalid credentials')
          await setCreds(['','']);
          return false;
        }
      }
    }
  }

  //need to put in checks on the backend for invalid inputs, someone could fake a request from outside our website
  //which would mean they could put whatever they wanted into inputs.
  const onSignUp = async (credentials) => {
    //const res = await fetch
    var wSock = new WebSocket("ws://10.0.0.5:8000/ws/test/");
    if(wSock){
      wSock.onopen = async function(event){
        wSock.send("signup" + credentials[0] + ":" + credentials[1] + ":" + credentials[2] + ":" +credentials[3] + ":" + credentials[4]);
      };
      wSock.onmessage = async function(event){
          var result = await event.data;
        wSock.close();
        wSock = false;
        if(result === 'YES'){
          console.log('welcome');
          return true;
        }
        else{
          console.log('invalid credentials')
          return false;
        }
      }
    }
  }

  // login
  const [creds, setCreds] = useState(["",""]);



  return (
    <div className="container">
      <div className="login">
        {page === -1 && <Login onSignIn={onSignIn} onSignUp={onSignUp}/>}
      </div>
      <div className="content">
      {page === 0 && <Header title={name} onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>}
      {page === 0 && showAddTask && <AddTask onAdd={addTask}/>}
      {page === 0 && (tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
      : 'No Tasks to Show')}
      </div>
      <div className="explore">
        {page === 1}
      </div>
      <div className="groups">
        {page === 1}
      </div>
      <div className="user">
        {page === 1}
      </div> 
      <div className="taskbar">
        {page > -1 && <TaskbarButton text={"Home"} id={0} onClick={changePage}/>}
        {page > -1 && <TaskbarButton text={"Explore"} id={1} onClick={changePage}/>}
        {page > -1 && <TaskbarButton text={"Groups"} id={2} onClick={changePage}/>}
        {page > -1 && <TaskbarButton text={"Me"} id={3} onClick={changePage}/>}
      </div>
    </div>
  );
}

export default App;