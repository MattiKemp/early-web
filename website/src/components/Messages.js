import Message from './Message'

// Componenet for displaying multiple posts.
// Properties:
// posts: the posts to be displayed (array of post objects)
// onPostSelected: function to be called when a post is selected
// saved: the ids of the post the user has saved (set of ints)
// onSave: function to be called when a post is saved
const Messages = ({ messages }) => {
    console.log(messages);
    return (
        <div>
            {messages.map((message) => (
                <Message key={message.localId} message={message} />
            ))}

        </div>
    )
}

export default Messages
