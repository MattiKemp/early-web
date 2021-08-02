import { useState, useEffect } from 'react'
import Post from './Post'

// Component for the Saved post tab in user info
// Properties:
// creds: user credentials (array of strings)
// onPostSelected: function to be called when the user clicks on a post
// select: the ids of the posts the users has saved
// onSave: function to be called when the user saves the post
const Saved = ({ creds , onPostSelected, select, saved, onSave }) => {
    // idk if we should save this info here or in app.js,
    // if we save it in app.js then we don't have to worry about 
    // making unnecessary calls to the server if the data hasn't changed.
    // put it in here for now, should be easy to switch over to the other version later.
    // the posts the user has saved
    const [savedPosts, setSavedPosts] = useState([])
    // a value based on the number of saved posts, used to give each post a unique local id
    const [savedPostsBottom, setSavedPostsBottom] = useState(0)
    // whether to fetch the saved posts.
    const [fetchSavedContent, setfetchSavedContent] = useState(true)

    // function to fetch the posts the user has saved
    // see backend comments for more info on specific endpoint details.
    async function fetchContentSaved(amount){
        if(savedPosts.length === 0 || amount > 0){
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
          var newPosts = savedPosts
          if(content !== null){
            for(var i = 0; i < content.length; i++){
              newPosts.push({reminder:false, ...content[i], localId: i + savedPostsBottom, group: 0});
            }
            await setSavedPosts(newPosts);
            setSavedPostsBottom(savedPostsBottom + content.length)
          }
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
                {savedPosts.map((post) => (
                    <Post key={post.localId} post={post} onPostSelected={onPostSelected} saved={saved} onSave={onSave}/>
                ))}
            </div>}
        </div>
    )
}

export default Saved
