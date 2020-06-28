import React from 'react';
import { Link } from "react-router-dom";
import './App.css';

import './css/bootstrap.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PostsProvider from "./components/PostsProvider";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {
    return (
        <PostsProvider>
            <Router>
                <div className="App">
                    <Route exact path="/">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <Link to="/posts/new" className="btn btn-primary">Создать пост</Link>
                        </nav>
                        <PostList/>
                    </Route>
                    <Route  path="/posts/([0-9]+)" render={props=><PostForm {...props} mode="view" />} />
                    <Route exact path="/posts/new" render={props=><PostForm {...props} mode="create" />} />
                </div>
            </Router>
        </PostsProvider>
    );
}

export default App;
