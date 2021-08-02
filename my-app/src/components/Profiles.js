import Profile from './Profile'

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
