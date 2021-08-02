import Header from './components/Header'
import Posts from './components/Posts'
import TaskbarButton from './components/TaskbarButton'
import SettingsButton from './components/SettingsButton'
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask'
import Login from './components/Login'
import MyProfile from './components/MyProfile'
import DisplayPost from './components/DisplayPost'
import Saved from './components/Saved'
import Following from './components/Following'

function App() {
  // credentials for the user
  // idea: have some kind of verifaction system for every call to the api. Obviously don't include the password
  // every time lol. Give them some kind of key.
  const [creds, setCreds] = useState(["",""]);
  // whether addTask should be displayed
  const [showAddTask, setShowAddTask] = useState(false)
  // the saved home page content
  const [fPosts, setFPosts] = useState([])
  // value based on the previous number of home page content, used to give each post a unique local id
  const [fPostsBottom, setFPostsBottom] = useState(0)
  // the saved explore page content
  const [ePosts, setEPosts] = useState([])
  // value based on the previous number of explore page content, used to give each post a unique local id
  const [ePostsBottom, setEPostsBottom] = useState(0)
  // the current page displayed
  const [page, setPage] = useState(-1)
  //const [signedIn, setSignedIn] = useState(false)
  // whether home page content should be fetched
  const [fetchFollowContent, setfetchFollowContent] = useState(false)
  // viewing posts
  const [postSelected, setPostSelected] = useState(false)
  // the content of the post selected by the user
  const [selectedPostContent, setSelectedPostContent] = useState({data:"", profile:""})
  //profile states for profile, following, saved, premium, and settings content visibility.
  const [profileStates, setProfileStates] = useState([true, false, false, false, false])
  // ids of posts the user has saved
  const [savedIds, setSavedIds] = useState(new Set())
  // whether the user saved posts ids should be fetched
  const [savedIdsFetched, setSavedIdsFetched] = useState(true)

  // Add Task, this is to add a new post, but isn't really setup or named properly.
  const addPost = (task, group) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newPost = { id, ...task }
    if(group === 0){
      setFPosts([...fPosts, newPost])
    }
    else if(group === 1){
      setEPosts([...ePosts, newPost])
    }
  }

  // Delete Task, not really used atm
  const deletePost = (id, group) => {
    if(group === 0){
      setFPosts(fPosts.filter((post) => post.id !==id))
    }
    else if(group === 1){
      setEPosts(ePosts.filter((post) => post.id !==id))
    }
  }
  
  // not really used atm
  const clearPosts = () => {
    setFPosts([])
    setEPosts([]);
  }

  // Toggle Reminder, not really used atm. Will probably delete this later
  const toggleReminder = (id, group) => {
    if(group === 0){
      setFPosts(fPosts.map((post) => 
      post.id === id ? { ...post, reminder: !post.reminder } : post))
    }
    else if(group === 1){
      setEPosts(ePosts.map((post) => 
      post.id === id ? { ...post, reminder: !post.reminder } : post))
    }
  }

  // function to view a selected posts content.
  // Takes post data of selected post.
  const changeSelect = (postData) => {
    setSelectedPostContent(postData)
    setPostSelected(true)
  }

  // function to change the current displayed page. 
  // Takes page ids: Login:-1, Home:0, Explore:1, Groups:2, Me:3
  const changePage = (pageId) => {
    setPage(pageId);
  }

  // function to validate user credentials with the server when signing in.
  // see backend comments for more info on specific endpoint details.
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
      await setfetchFollowContent(true);
      changePage(0);
      return true;
    }
    else{
      console.log('invalid credentials')
      return false;
    }
  }

  // need to put in checks on the backend for invalid inputs, someone could fake a request from outside our website
  // which would mean they could put whatever they wanted into inputs.
  // function called when a user makes a signup request, this currently isn't setup on the backend.
  // *note: this and signIn may be moved into the Login component in the future.
  // see backend comments for more info on specific endpoint details.
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
      return true;
    }
    else{
      console.log('invalid credentials')
      return false;
    }
  }

  // function to get currently saved post ids for the user.
  // see backend comments for more info on specific endpoint details.
  async function fetchSaved(){
      const Data={
        user: creds[0]
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
      const response = await fetch("https://10.0.0.5:8000/saved/",otherParam)
      const content = await response.json();
      var newSaved = new Set();
      var newIDs = content.result.split(",")
      for(var i = 0; i < newIDs.length; i++){
        newSaved.add(parseInt(newIDs[i]))
      }
      setSavedIds(newSaved)
  }

  // function to get explore page content.
  // see backend comments for more info on specific endpoint details.
  // later on this will be somewhat tailored to the user, like what instagram does.
  async function fetchContentAll(amount){
    if(ePosts.length === 0 || amount > 0){
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
      var newPosts = ePosts
      for(var i = 0; i < content.length; i++){
        await newPosts.push({reminder:false, ...content[i], localId: i + ePostsBottom, group: 1});
      }
      await setEPosts(newPosts);
      await setEPostsBottom(ePostsBottom + content.length)
    }
  }

  // function to get home page content.
  // see backend comments for more info on specific endpoint details.
  async function fetchContentFollowing(amount){
    if(fPosts.length === 0 || amount > 0){
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
      var newPosts = fPosts
      if(content !== null){
        for(var i = 0; i < content.length; i++){
          newPosts.push({reminder:false, ...content[i], localId: i + fPostsBottom, group: 0});
        }
        await setFPosts(newPosts);
        setFPostsBottom(fPostsBottom + content.length)
      }
    }
  }

  // function to change whether a post is saved for this user.
  // see backend comments for more info on specific endpoint details.
  async function setSaved(id){
      const Data={
        user: creds[0],
        id: id
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
      const response = await fetch("https://10.0.0.5:8000/saved-set/",otherParam)
      const content = await response.json();
      var newSaved = new Set();
      var newIDs = content.result.split(",")
      for(var i = 0; i < newIDs.length; i++){
        newSaved.add(parseInt(newIDs[i]))
      }
      setSavedIds(newSaved)
  }

  // if page update
  useEffect(() => {
    if(fetchFollowContent){
      fetchContentFollowing(10);
      setfetchFollowContent(false);
      if(savedIdsFetched){
        fetchSaved();
        setSavedIdsFetched(false)
      }
    }
  });

  // profile content visibilty
  const changeProfileVars = (id) => {
    var newStates = [false, false, false, false, false]
    newStates[id] = true
    setProfileStates(newStates)
  }

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
          {showAddTask && <AddTask onAdd={addPost}/>}
          {(fPosts.length > 0 ? <Posts posts={fPosts} onDelete={deletePost} onToggle={toggleReminder} onPostSelected={changeSelect} saved={savedIds} onSave={setSaved}/>
          : 'No content to show!')}
        </div>}
        {page === 1 && <div className="explore">
          {/* make a search component :P, just for looks atm. */}
          <div className='form-control'>
            <input type='text' placeholder='Search'/>
          </div>
          <input className='btn btn-block' type='submit' value='Search' />
          {(ePosts.length > 0 ? <Posts posts={ePosts} onDelete={deletePost} onToggle={toggleReminder} onPostSelected={changeSelect} saved={savedIds} onSave={setSaved}/>
          : 'No content to Show!')}
        </div>}
        {page === 2 && <div className="groups">
    
        </div>}
        </div>}
        {page === 3 && <div className="user">
          <div className="settings-bar">
            <SettingsButton text={"Profile"} onClick={() => {changeProfileVars(0)}}/>
            <SettingsButton text={"Following"} onClick={() => {changeProfileVars(1)}}/>
            <SettingsButton text={"Saved"} onClick={() => {changeProfileVars(2)}}/>
            <SettingsButton text={"Premium"} onClick={() => {changeProfileVars(3)}}/>
            <SettingsButton text={"Settings"} onClick={() => {changeProfileVars(4)}}/>
          </div>
          <div>
            <MyProfile select={profileStates[0]} creds={creds}/>
            <Following select={profileStates[1]} username={creds[0]} saved={savedIds}/>
            <Saved select={profileStates[2]} creds={creds} onPostSelected={changeSelect} saved={savedIds} onSave={setSaved}/>
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