import { useState, useEffect } from 'react'
import Profiles from './Profiles'

const Following = ({ username, select }) => {
    // idk if we should save this info here or in app.js,
    // if we save it in app.js then we don't have to worry about 
    // making unnecessary calls to the server if the data hasn't changed.
    // put it in here for now, should be easy to switch over to the other version later.
    const [followingProfiles, setFollowingProfiles] = useState([])
    const [followingBottom, setFollowingBottom] = useState(0)
    const [fetchProfiles, setfetchProfiles] = useState(true)

    // all of these async functions are getting called twice per load, figure this out later.
    async function fetchFollowingProfiles(amount){
        if(followingProfiles.length === 0 || amount > 0){
        //   console.log('fetching following content');
          const Data={
            user: username,
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
          const response = await fetch("https://10.0.0.5:8000/content-profile-following/",otherParam)
          const content = await response.json();
        //   console.log(content)
          var newProfiles = followingProfiles
          if(content !== null){
            // console.log(content);
            for(var i = 0; i < content.length; i++){
                newProfiles.push({...content[i], localId: i + followingBottom});
            }
            await setFollowingProfiles(newProfiles);
            setFollowingBottom(followingBottom + content.length)
          }
          // setfetchFollowContent(false);
        }
      }

    useEffect(() => {
        if(select === true && fetchProfiles === true){
            fetchFollowingProfiles(10)
            setfetchProfiles(false)
        }
    });

    return (
        <div className="following-content">
            {select && <div>
                <Profiles profiles={followingProfiles}/>
            </div>}
        </div>
    )
}

export default Following
