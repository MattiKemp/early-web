import Post from './Post'

// Componenet for displaying multiple posts.
// Properties:
// posts: the posts to be displayed (array of post objects)
// onPostSelected: function to be called when a post is selected
// saved: the ids of the post the user has saved (set of ints)
// onSave: function to be called when a post is saved
const Posts = ({ posts, onDelete, onToggle, onPostSelected, saved, onSave}) => {

    return (
        <div>
            {posts.map((post) => (
                <Post key={post.localId} post={post} onDelete={onDelete} onToggle={onToggle} onPostSelected={onPostSelected} saved={saved} onSave={onSave}/>
            ))}

        </div>
    )
}

export default Posts
