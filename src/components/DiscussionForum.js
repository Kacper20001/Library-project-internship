import React, { useContext, useState } from 'react';
import PostsContext from '../PostsContext';
import { UserContext } from '../UserContext';
import Post from '../models/Post';
import 'bootstrap/dist/css/bootstrap.min.css';

const Discussion = () => {
    const { posts, setPosts } = useContext(PostsContext);
    const { loggedInUser } = useContext(UserContext);
    const [newPostContent, setNewPostContent] = useState('');
    const [newReplyContent, setNewReplyContent] = useState({});
    const [replyToPostId, setReplyToPostId] = useState(null);
    const [showRepliesId, setShowRepliesId] = useState(null);

    const handleNewPostChange = event => {
        setNewPostContent(event.target.value);
    };

    const handleNewPostSubmit = event => {
        event.preventDefault();
        if (loggedInUser) {
            setPosts([
                ...posts,
                new Post(loggedInUser.id, loggedInUser.username, newPostContent),
            ]);
            setNewPostContent('');
        }
    };

    const handleNewReplyChange = event => {
        setNewReplyContent({...newReplyContent, [replyToPostId]: event.target.value});
    };

    const handleNewReplySubmit = event => {
        event.preventDefault();
        if (loggedInUser && replyToPostId) {
            setPosts(posts.map(post => {
                if (post.id === replyToPostId) {
                    post.replies.push(new Post(loggedInUser.id, loggedInUser.username, newReplyContent[replyToPostId]));
                }
                return post;
            }));
            setNewReplyContent({...newReplyContent, [replyToPostId]: ''});
        }
    };

    const handleReplyToPost = postId => {
        setReplyToPostId(postId);
    }

    const handleShowHideReplies = postId => {
        if (postId === showRepliesId) {
            setShowRepliesId(null);
        } else {
            setShowRepliesId(postId);
        }
    }

    const handleDeletePost = postId => {
        setPosts(posts.filter(post => post.id !== postId));
    };

    const renderReplies = (replies, postId) => {
        const visibleReplies = showRepliesId === postId ? replies : replies.slice(Math.max(replies.length - 1, 0));
        return visibleReplies.map(reply => (
            <div key={reply.id}>
                <h6>{reply.authorName}</h6>
                <p>{reply.content}</p>
            </div>
        ));
    }
    return (
        <div className="container py-3">
            <h3 className="mb-3">Dyskusja</h3>
            <form onSubmit={handleNewPostSubmit} className="mb-3">
                <textarea value={newPostContent} placeholder="Twój temat" onChange={handleNewPostChange} className="form-control mb-2" />
                <button type="submit" className="btn btn-primary">Wyślij</button>
            </form>
            {posts.map(post => (
                <div key={post.id} className="card mb-2">
                    <div className="card-header">
                        <h5>{post.authorName}</h5>
                    </div>
                    <div className="card-body">
                        <p>{post.content}</p>
                        {loggedInUser && loggedInUser.id === post.authorId && (
                            <button onClick={() => handleDeletePost(post.id)} className="btn btn-danger btn-sm mr-2">
                                Usuń post
                            </button>
                        )}
                        {loggedInUser && (
                            <button onClick={() => handleReplyToPost(post.id)} className="btn btn-secondary btn-sm mr-2">
                                Odpowiedz
                            </button>
                        )}
                        <button onClick={() => handleShowHideReplies(post.id)} className="btn btn-info btn-sm">
                            {showRepliesId === post.id ? 'Ukryj' : 'Pokaż więcej'}
                        </button>
                        {renderReplies(post.replies, post.id)}
                    </div>
                    {replyToPostId === post.id && (
                        <div className="card-footer">
                            <form onSubmit={handleNewReplySubmit}>
                                <textarea value={newReplyContent[replyToPostId] || ''} placeholder="Twój komentarz" onChange={handleNewReplyChange} className="form-control mb-2" />
                                <button type="submit" className="btn btn-primary btn-sm">Odpowiedz</button>
                            </form>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


export default Discussion;