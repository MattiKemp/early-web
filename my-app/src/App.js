import Header from './components/Header'
import Tasks from './components/Tasks'
import TaskbarButton from './components/TaskbarButton'
import SettingsButton from './components/SettingsButton'
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask'
import Login from './components/Login'
import MyProfile from './components/MyProfile'
import { isCompositeComponent } from 'react-dom/cjs/react-dom-test-utils.production.min'
import DisplayPost from './components/DisplayPost'


function App() {
  const [creds, setCreds] = useState(["",""]);
  const [showAddTask, setShowAddTask] = useState(false)
  const [fTasks, setFTasks] = useState([])
  const [fTasksBottom, setFTasksBottom] = useState(0)
  //const [showAddTask, setShowAddTask] = useState(false)
  const [eTasks, setETasks] = useState([])
  const [eTasksBottom, setETasksBottom] = useState(0)
  const [page, setPage] = useState(-1)
  //const [signedIn, setSignedIn] = useState(false)
  const [fetchFollowContent, setfetchFollowContent] = useState(false)
  // viewing posts
  const [postSelected, setPostSelected] = useState(false)
  const [selectedPostContent, setSelectedPostContent] = useState({data:"", profile:""})

  // Add Task
  const addTask = (task, group) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    if(group === 0){
      setFTasks([...fTasks, newTask])
    }
    else if(group === 1){
      setETasks([...eTasks, newTask])
    }
  }

  // Delete Task
  const deleteTask = (id, group) => {
    if(group === 0){
      setFTasks(fTasks.filter((task) => task.id !==id))
    }
    else if(group === 1){
      setETasks(eTasks.filter((task) => task.id !==id))
    }
  }

  const clearTask = () => {
    setFTasks([])
    setETasks([]);
  }

  // Toggle Reminder
  const toggleReminder = (id, group) => {
    if(group === 0){
      setFTasks(fTasks.map((task) => 
      task.id === id ? { ...task, reminder: !task.reminder } : task))
    }
    else if(group === 1){
      setETasks(eTasks.map((task) => 
      task.id === id ? { ...task, reminder: !task.reminder } : task))
    }
  }

  const changeSelect = (postData) => {
    setSelectedPostContent(postData)
    setPostSelected(true)
  }

  const changePage = (pageId) => {
    setPage(pageId);
  }

  const onSignIn = async (credentials) => {
    const Data={
      user: credentials[0],
      pass: credentials[1]
    }
    const otherParam={
      mode: 'cors',
      credentials: 'same-origin',
      //headers:{
      //  "content-type":"application/json; charset=UTF-8"
      //},
      body: JSON.stringify(Data),
      method: "POST"
    };
    const response = await fetch("https://10.0.0.5:8000/login/",otherParam)
    const content = await response.json();
    if(content.valid === "YES"){
      console.log("welcome!");
      await setCreds([credentials[0], credentials[1]]);
      //console.log(creds);
      await setfetchFollowContent(true);
      changePage(0);
      //fetchContentFollowing(10);
      return true;
    }
    else{
      console.log('invalid credentials')
      //await setCreds(['','']);
      return false;
    }
  }

  //need to put in checks on the backend for invalid inputs, someone could fake a request from outside our website
  //which would mean they could put whatever they wanted into inputs.
  const onSignUp = async (credentials) => {
    const Data={
      user: credentials[0],
      pass: credentials[1],
      first: credentials[2],
      last: credentials[3],
      phone: credentials[4]
    }
    const otherParam={
      mode: 'cors',
      credentials: 'same-origin',
      //headers:{
      //  "content-type":"application/json; charset=UTF-8"
      //},
      body: JSON.stringify(Data),
      method: "POST"
    };
    const response = await fetch("https://10.0.0.5:8000/signup/",otherParam)
    const content = await response.json();
    if(content.valid === "YES"){
      console.log("welcome!");
      //await setCreds([credentials[0], credentials[1]]);
      //changePage(0);
      return true;
    }
    else{
      console.log('invalid credentials')
      //await setCreds(['','']);
      return false;
    }
  }

  // login
  // idea: have some kind of verifaction system for every call to the api. Obviously don't include the password
  // every time lol. Give them some kind of key.

  // later on this will be somewhat tailored to the user, like what instagram does.
  async function fetchContentAll(amount){
    if(eTasks.length === 0 || amount > 0){
      console.log('fetching explore content');
      const Data={
        depth: amount
      }
      const otherParam={
        mode: 'cors',
        credentials: 'same-origin',
        //headers:{
        //  "content-type":"application/json; charset=UTF-8"
        //},
        body: JSON.stringify(Data),
        method: "POST"
      };
      const response = await fetch("https://10.0.0.5:8000/content-all/",otherParam)
      const content = await response.json();
      //console.log(content)
      var newTasks = eTasks
      for(var i = 0; i < content.length; i++){
        await newTasks.push({reminder:false, ...content[i], id: i + eTasksBottom, group: 1});
      }
      await setETasks(newTasks);
      await setETasksBottom(eTasksBottom + content.length)
      //console.log(eTasksBottom)
    }
  }

  async function fetchContentFollowing(amount){
    if(fTasks.length === 0 || amount > 0){
      console.log('fetching follow content');
      const Data={
        user: creds[0],
        depth: amount
      }
      const otherParam={
        mode: 'cors',
        credentials: 'same-origin',
        //headers:{
        //  "content-type":"application/json; charset=UTF-8"
        //},
        body: JSON.stringify(Data),
        method: "POST"
      };
      const response = await fetch("https://10.0.0.5:8000/content-following/",otherParam)
      const content = await response.json();
      //console.log(content)
      var newTasks = fTasks
      if(content !== null){
        // console.log(content);
        for(var i = 0; i < content.length; i++){
          newTasks.push({reminder:false, ...content[i], id: i + fTasksBottom, group: 0});
        }
        await setFTasks(newTasks);
        setFTasksBottom(fTasksBottom + content.length)
      }
      // setfetchFollowContent(false);
    }
  }


  useEffect(() => {
    // console.log("updated");
    if(fetchFollowContent){
      fetchContentFollowing(10);
      setfetchFollowContent(false);
    }
  });



  return (
    <div className="container">
      {!postSelected && <div>
        {page < 3 && <div className="main-content">
        {page === -1 && <div className="login">
          <Login onSignIn={onSignIn} onSignUp={onSignUp}/>
        </div>}
        {page === 0 && <div className="content">
          {/* {loginTest && fetchContentFollowing(10) && setLoginTest(false)} */}
          <Header title={creds[0]} onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {(fTasks.length > 0 ? <Tasks tasks={fTasks} onDelete={deleteTask} onToggle={toggleReminder} onPostSelected={changeSelect}/>
          : 'No content to show!')}
        </div>}
        {page === 1 && <div className="explore">
          {/* make a search component :P, just for looks atm. */}
          <div className='form-control'>
            <input type='text' placeholder='Search'/>
          </div>
          <input className='btn btn-block' type='submit' value='Search' />
          {(eTasks.length > 0 ? <Tasks tasks={eTasks} onDelete={deleteTask} onToggle={toggleReminder} onPostSelected={changeSelect}/>
          : 'No Tasks to Show')}
        </div>}
        {page === 2 && <div className="groups">
    
        </div>}
        </div>}
        {page === 3 && <div className="user">
          <div className="settings-bar">
            <SettingsButton text={"Profile"} onClick={() => {}}/>
            <SettingsButton text={"Following"} onClick={() => {}}/>
            <SettingsButton text={"Saved"} onClick={() => {}}/>
            <SettingsButton text={"Premium"} onClick={() => {}}/>
            <SettingsButton text={"Settings"} onClick={() => {}}/>
          </div>
          <div>
            <MyProfile />
          </div>
        </div>}
        <div className="taskbar">
          {page > -1 && <TaskbarButton text={"Home"} id={0} onClick={changePage} contentLoad={() => {}}/>}
          {page > -1 && <TaskbarButton text={"Explore"} id={1} onClick={changePage} contentLoad={fetchContentAll}/>}
          {page > -1 && <TaskbarButton text={"Groups"} id={2} onClick={changePage} contentLoad={()=>{}}/>}
          {page > -1 && <TaskbarButton text={"Me"} id={3} onClick={changePage} contentLoad={()=>{}}/>}
        </div>
      </div>}
      <div>
        <DisplayPost content={selectedPostContent} back={setPostSelected} select={postSelected}/>
      </div>
    </div>
  );
}

export default App;