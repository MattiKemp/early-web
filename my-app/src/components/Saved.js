import { useState, useEffect } from 'react'
import Task from './Task'


const Saved = ({ creds , onPostSelected, select }) => {
    // idk if we should save this info here or in app.js,
    // if we save it in app.js then we don't have to worry about 
    // making unnecessary calls to the server if the data hasn't changed.
    // put it in here for now, should be easy to switch over to the other version later.
    const [savedTasks, setSavedTasks] = useState([])
    const [savedTasksBottom, setSavedTasksBottom] = useState(0)
    const [fetchSavedContent, setfetchSavedContent] = useState(true)

    async function fetchContentSaved(amount){
        if(savedTasks.length === 0 || amount > 0){
          console.log('fetching saved content');
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
          const response = await fetch("https://10.0.0.5:8000/content-saved/",otherParam)
          const content = await response.json();
        //   console.log(content)
          var newTasks = savedTasks
          if(content !== null){
            // console.log(content);
            for(var i = 0; i < content.length; i++){
              newTasks.push({reminder:false, ...content[i], id: i + savedTasksBottom, group: 0});
            }
            await setSavedTasks(newTasks);
            setSavedTasksBottom(savedTasksBottom + content.length)
          }
          // setfetchFollowContent(false);
        }
      }

    useEffect(() => {
        if(select === true && fetchSavedContent === true){
            fetchContentSaved(10)
            setfetchSavedContent(false)
        }
    });
    
    return (
        <div className="saved-content">
            {select && <div>
                {savedTasks.map((task) => (
                    <Task key={task.id} task={task} onPostSelected={onPostSelected}/>
                ))}
            </div>}
        </div>
    )
}

export default Saved
