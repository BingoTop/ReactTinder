import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import Nav from './components/views/Nav/Nav';
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './components/views/VideoDetailPage/VideoDetailPage';

function App() {
    return (
        <Router>
            <Nav />
            <div
                style={{
                    paddingTop: '75px',
                    minHeight: 'calc(100vh-80px)',
                }}
            >
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={Auth(
                            LandingPage,
                            null
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/login"
                        component={Auth(
                            LoginPage,
                            false
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/register"
                        component={Auth(
                            RegisterPage,
                            false
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/video/upload"
                        component={Auth(
                            VideoUploadPage,
                            true
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/video/:videoId"
                        component={Auth(
                            VideoDetailPage,
                            null
                        )}
                    ></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
