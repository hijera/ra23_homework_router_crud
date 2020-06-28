import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import PostsContext from "../contexts/PostsContext";
import { Redirect } from 'react-router-dom';

PostForm.propTypes = {

};

function PostForm(props) {
    const { history,match,id,hideClose } = props;

    const { createNewPost,posts,updatePost,deletePost,isLoading,setNewPost,newPost } = useContext(PostsContext);
    const [form,setForm] = useState({ post: (newPost && newPost.content && newPost.content.length>0) ? newPost.content : '' });
    const [curMode,setCurMode] = useState(props.mode);

    const currentPost = (match && match.params && match.params[0]) ? posts.find(post => (parseInt(post.id)===parseInt(match.params[0]))) : {id:id,content:props.content};
    const loadingBlock =<div className="" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
            <div className="alert alert-info" role="alert">
                Идет загрузка...
            </div>
        </div>
    </div>;
    const handleChange = evt => {
      const { target } = evt;
      setForm({...form,[target.name]: target.value });
    };
    const handleSubmit = evt => {
        evt.preventDefault();
        createNewPost(form.post);
        setNewPost({content:null});
        history.push("/");
    };
    const handleClose = evt => {
        evt.preventDefault();
        if (curMode=='create')
        {
            setNewPost({content:form.post});
        }
        history.goBack();
    };


    const handleEdit = evt => {
        setForm({post:(id) ? props.content : processValue(currentPost).content});
        setCurMode('edit');
    };
    const handleDelete = evt => {
        deletePost(match.params[0]);
        history.push("/");
    };
    const handleEditFinish = evt => {
        updatePost(match.params[0],form.post);
        setCurMode('view');
    };

    const processValue = item => {
        if (!item)
        {

            return PostForm.defaultProps.content;
        }
        return item;
    };

    return (
        <form onSubmit={handleSubmit} >
            {isLoading && loadingBlock}
            {!isLoading &&
        <div className="" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="">
                        {!hideClose &&
                        <button type="button" className="close closebutton" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        }
                    </div>
                    <div className="modal-body">
                        <img src={process.env.REACT_APP_AVATAR_URL} alt={"Avatar"} className={"user-avatar"} />
                        {(curMode=='edit' || curMode=='create') &&
                        <textarea name={'post'} value={form.post} onChange={handleChange} />
                        }
                        {(curMode=='view') &&
                        <p>{(id) ? props.content : processValue(currentPost).content}</p>
                        }
                    </div>
                    {!hideClose &&
                    <div className="modal-footer">
                        {curMode=='create' &&
                        <button type="submit" className="btn btn-primary">Опубликовать</button>
                        }
                        {curMode=='edit' &&
                        <button type="button" className="btn btn-primary" onClick={handleEditFinish}>Сохранить</button>
                        }
                        {(curMode=='view' && match && match.params[0]) &&
                        <>
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>Изменить</button>
                            <button type="button" className="btn btn-secondary" onClick={handleDelete} >Удалить</button>
                        </>
                        }
                    </div>
                    }
                </div>
            </div>
        </div>
            }
        </form>
    );
}

PostForm.defaultProps = {
    content: "[Пустой пост]",
    id:0
};

export default PostForm;