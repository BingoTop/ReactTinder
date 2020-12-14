import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';
import {
    Form,
    Input,
    Tooltip,
    Checkbox,
    Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

function RegisterPage(props) {
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [
        ConfirmPassword,
        setConfirmPassword,
    ] = useState('');

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };
    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value);
    };

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        if (Password !== ConfirmPassword) {
            return alert(
                '비밀번호를 확인해주십시오.'
            );
        }

        let body = {
            email: Email,
            name: Name,
            password: Password,
        };
        dispatch(registerUser(body)).then(
            (res) => {
                if (res.payload.success) {
                    props.history.push('/login');
                } else {
                    alert('Faild to Sign Up');
                }
            }
        );
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onSubmit}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message:
                            'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message:
                            'Please input your E-mail!',
                    },
                ]}
            >
                <Input
                    value={Email}
                    onChange={onEmailHandler}
                />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message:
                            'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password
                    onChange={onPasswordHandler}
                    value={Password}
                />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message:
                            'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (
                                !value ||
                                getFieldValue(
                                    'password'
                                ) === value
                            ) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                'The two passwords that you entered do not match!'
                            );
                        },
                    }),
                ]}
            >
                <Input.Password
                    onChange={
                        onConfirmPasswordHandler
                    }
                    value={ConfirmPassword}
                />
            </Form.Item>

            <Form.Item
                name="nickname"
                label={
                    <span>
                        Nickname
                        <Tooltip title="What do you want others to call you?">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message:
                            'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input
                    vaule={Name}
                    onChange={onNameHandler}
                />
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(
                                      'Should accept agreement'
                                  ),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the{' '}
                    <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    회원가입
                </Button>
            </Form.Item>
        </Form>
    );
}

export default withRouter(RegisterPage);
