import { createContext, useState } from 'react';
import Post from './models/Post';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const addPost = (authorId, authorName, content) => {
        const newPost = new Post(authorId, authorName, content);
        setPosts((prevPosts) => [...prevPosts, newPost]);
    };

    const deletePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    };

    const addReply = (postId, authorId, authorName, content) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    const newReply = new Post(authorId, authorName, content);
                    post.replies.push(newReply);
                }
                return post;
            })
        );
    };

    return (
        <PostsContext.Provider value={{ posts, addPost, deletePost, addReply }}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsContext;
