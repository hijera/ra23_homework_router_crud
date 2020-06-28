import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import PostsContext from "../contexts/PostsContext";
import PostForm from "./PostForm";
import {Link} from "react-router-dom";

PostList.propTypes = {};

function PostList(props) {
    const {posts, isLoading} = useContext(PostsContext);
    const loadingBlock = <div className="" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
            <div className="alert alert-info" role="alert">
                Идет загрузка...
            </div>
        </div>
    </div>;
    return (
        <div>
            {isLoading && loadingBlock}
            {(!isLoading && posts.length > 0) && posts.map(post => <Link to={'/posts/' + post.id}><PostForm
                key={post.id} content={post.content} id={post.id} mode={'view'} hideClose={true}/></Link>)}
        </div>
    );
}

export default PostList;