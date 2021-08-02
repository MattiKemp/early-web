import { FaTimes, FaTrashAlt } from 'react-icons/fa'
import Image from './Image'



const Profile = ({ profile }) => {

    return (
        <div className={`profile-collapsed`}>
            <Image source={'https://10.0.0.5:8001/media/images/' + profile.picture} profileStyle={1}/>
            <h3>{profile.first + ' ' + profile.last} <FaTimes style={{color: 'red', cursor: 'pointer'}} /></h3>
        </div>
    )
}

export default Profile
