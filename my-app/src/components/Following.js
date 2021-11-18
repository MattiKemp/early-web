import { useState, useEffect } from 'react'
import Profiles from './Profiles'

// Component for the following tab in user info
// Properties:
// username: the username of the current user (string)
// select: whether the following tab is currently selected (boolean)
const Following = ({ username, select }) => {
    // idk if we should save this info here or in app.js,
    // if we save it in app.js then we don't have to worry about 
    // making unnecessary calls to the server if the data hasn't changed.
    // put it in here for now, should be easy to switch over to the other version later.
    // the profiles the user is currently following (profile)
    const [followingProfiles, setFollowingProfiles] = useState([])
    // a value based on the previous number of profiles, used to give each profile a unique local id.
    const [followingBottom, setFollowingBottom] = useState(0)
    // whether the followed profiles should be fetched.
    const [fetchProfiles, setfetchProfiles] = useState(true)

    // function to fetch all the profiles this user is following.
    // see backend comments for more info on specific endpoint details.
    // all of these async functions are getting called twice per load, figure this out later.
    async function fetchFollowingProfiles(amount){
        if(followingProfiles.length === 0 || amount > 0){
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
          console.log('fetchFollowingProfiles called');
          const response = await fetch("https://workoutdev.org:8000/content-profile-following/",otherParam)
          const content = await response.json();
          var newProfiles = followingProfiles
          if(content !== null){
            for(var i = 0; i < content.length; i++){
                newProfiles.push({...content[i], localId: i + followingBottom});
            }
            await setFollowingProfiles(newProfiles);
            setFollowingBottom(followingBottom + content.length)
          }
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
