import { useState } from 'react'

const Following = ({ username, select }) => {
    // idk if we should save this info here or in app.js,
    // if we save it in app.js then we don't have to worry about 
    // making unnecessary calls to the server if the data hasn't changed.
    // put it in here for now, should be easy to switch over to the other version later.
    const [followingProfiles, setFollowingProfiles] = useState([])

    return (
        <div className="following-content">
        </div>
    )
}

export default Following
