import React, {useEffect, useState} from 'react';
import PostsContext from "../contexts/PostsContext";
import useStorage from "../hooks/useStorage";


function PostsProvider(props) {

    const [newPost, setNewPost] = useStorage(localStorage, 'newPost', true);
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const getPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_POSTS_URL, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });


            if (response.ok) {


            }

            const postsData = await (response.ok) ? await response.json() : [];
            setPosts(postsData);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getPosts();
    }, []);

    const deletePost = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_DELETE_URL.replace("{id}", id), {
                method: 'DELETE',

                headers: {'Content-Type': 'application/json'},
            });
            if (response.ok) {
                getPosts();
            } else {
                throw new Error('Error deleting post ' + id + '!');
            }
        } catch (e) {

        } finally {
            setLoading(false);
        }
    };
    const createNewPost = async (text) => {
        setLoading(true);
        try {
            const body = {id: 0, content: text};
            const response = await fetch(process.env.REACT_APP_CREATE_URL, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'},
            });


            if (response.ok) {
                getPosts();
            } else {
                throw new Error('Error creating new post!');
            }
            const postsData = await (response.ok) ? response.json() : [];
            setPosts(postsData);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    };
    const updatePost = async (id, content) => {
        const body = {id: parseInt(id), content: content};
        setLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_EDIT_URL, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'},
            });
            if (response.ok) {
                getPosts();
            } else {
                throw new Error('Error updating new post!');
            }
        } catch (e) {

        } finally {
            setLoading(false);
        }

    };
    return (
        <PostsContext.Provider value={{posts, setNewPost, createNewPost, updatePost, deletePost, isLoading, newPost}}>
            {props.children}
        </PostsContext.Provider>
    )
}

export default PostsProvider;