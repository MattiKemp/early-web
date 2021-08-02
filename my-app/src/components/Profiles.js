import Profile from './Profile'

// Component for displaying multiple user profiles
// Properties:
// profiles: list of user profiles (array of profile objects)
const Profiles = ({ profiles }) => {

    return (
        <div>
            {profiles.map((profile) => (
                <Profile key={profile.localId} profile={profile} />
            ))}

        </div>
    )
}

export default Profiles
