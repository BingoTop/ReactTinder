import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AppleFilled } from '@ant-design/icons';
import './Nav.css';

function Nav() {
    const user = useSelector(
        (state) => state.user
    );

    if (user.userData && !user.userData.isAuth) {
        return (
            <div className="header">
                <div className="logo">
                    <AppleFilled
                        style={{
                            fontSize: '32px',
                        }}
                    />
                </div>
                <Menu
                    theme="Compact"
                    mode="horizontal"
                    style={{
                        color: 'black',
                        fontWeight: 1000,
                        backgroundColor: 'white',
                    }}
                >
                    <Menu.Item key="home">
                        <Link to="/">Home</Link>
                    </Menu.Item>

                    <Menu.Item key="mail">
                        <a href="/login">
                            Signin
                        </a>
                    </Menu.Item>
                    <Menu.Item key="app">
                        <a href="/register">
                            Signup
                        </a>
                    </Menu.Item>
                </Menu>
            </div>
        );
    } else {
        return (
            <div className="header">
                <div className="icons-list">
                    <AppleFilled />
                </div>
                <Menu
                    theme="Compact"
                    mode="horizontal"
                    style={{
                        color: 'black',
                        fontWeight: 1000,
                        backgroundColor: 'white',
                    }}
                >
                    <Menu.Item key="1">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Nav;
