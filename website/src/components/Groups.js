import Group from './Group'

// Componenet for displaying multiple posts.
// Properties:
// posts: the posts to be displayed (array of post objects)
// onPostSelected: function to be called when a post is selected
// saved: the ids of the post the user has saved (set of ints)
// onSave: function to be called when a post is saved
const Groups = ({ groups, onGroupSelected}) => {

    return (
        <div>
            {groups.map((group) => (
                <Group key={group.localId} group={group} messages={group.messages} onGroupSelected={onGroupSelected} />
            ))}

        </div>
    )
}

export default Groups
