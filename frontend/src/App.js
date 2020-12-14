import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import Nav from './components/views/Nav/Nav';

function App() {
    return (
        <Router>
            <Nav />
            <Row gutter={8}>
                <Col xs={24} md={6}></Col>
                <Col xs={24} md={12}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent:
                                'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '80vh',
                        }}
                    >
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
                    </div>
                </Col>
                <Col xs={24} md={6}></Col>
            </Row>
        </Router>
    );
}

export default App;
