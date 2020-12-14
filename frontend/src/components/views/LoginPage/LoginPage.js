import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    Checkbox,
} from 'antd';
import {
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';
import './LoginPage.css';

function LoginPage(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };
    const onSubmit = (e) => {
        let body = {
            email: email,
            password: password,
        };
        dispatch(loginUser(body)).then(
            (res, err) => {
                if (res.payload.loginSuccess) {
                    props.history.push('/');
                } else {
                    alert('Error');
                }
            }
        );
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
        >
            <h2>로그인</h2>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message:
                            'Please input your Username!',
                    },
                ]}
            >
                <Input
                    value={email}
                    onChange={onEmailHandler}
                    prefix={
                        <UserOutlined className="site-form-item-icon" />
                    }
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message:
                            'Please input your Password!',
                    },
                ]}
            >
                <Input
                    value={password}
                    onChange={onPasswordHandler}
                    prefix={
                        <LockOutlined className="site-form-item-icon" />
                    }
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    noStyle
                >
                    <Checkbox>
                        Remember me
                    </Checkbox>
                </Form.Item>

                <a
                    className="login-form-forgot"
                    href=""
                >
                    Forgot password
                </a>
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    로그인
                </Button>
                Or{' '}
                <a href="/register">회원가입</a>
            </Form.Item>
        </Form>
    );
}

export default withRouter(LoginPage);
