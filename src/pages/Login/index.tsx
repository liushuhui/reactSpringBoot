import { login, register } from '@/api/login';
import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const naigate = useNavigate();
    const params = useLocation();
    const [isLogin, setIsLogin] = useState(params.pathname === '/login')
    console.log('params', isLogin)

    useEffect(() => {
        setIsLogin(params.pathname === '/login')
    }, [params.pathname])

    return (
        <div
            style={{
                backgroundColor: 'white',
                height: '100vh',
            }}
        >
            <LoginFormPage
                form={form}
                backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                title={isLogin ? "登录" : '注册'}
                subTitle="一往无前"
                containerStyle={{
                    backdropFilter: 'blur(4px)',
                }}
                submitter={{
                    searchConfig: {
                        submitText: isLogin ? '登录' : '注册',
                    }
                }}
                onFinish={async (values) => {
                    if (isLogin) {
                        const res: any = await login(values);
                        if (res?.success) {
                            message.success('登录成功！');
                            localStorage.setItem('app_token', res?.data);
                            window.location.href = '/';
                        } else {
                            message.error(res?.message);
                        }
                    } else {
                        const res: any = await register(values);
                        if (res?.success) {
                            message.success('注册成功！');
                            naigate('/login');
                        } else {
                            message.error(res?.message);
                        }
                    }

                }}
            >

                <>
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: (
                                <UserOutlined
                                    style={{
                                        color: token.colorText,
                                    }}
                                    className={'prefixIcon'}
                                />
                            ),
                        }}
                        placeholder='请输入用户名'
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: (
                                <LockOutlined
                                    style={{
                                        color: token.colorText,
                                    }}
                                    className={'prefixIcon'}
                                />
                            ),
                        }}
                        placeholder='请输入密码'
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('confirmPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致！'));
                                },
                            })
                        ]}
                    />
                    {!isLogin &&
                        <ProFormText.Password
                            name="confirmPassword"
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <LockOutlined
                                        style={{
                                            color: token.colorText,
                                        }}
                                        className={'prefixIcon'}
                                    />
                                ),
                            }}
                            placeholder='请输入确认密码'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入确认密码！',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次输入的密码不一致！'));
                                    },
                                })
                            ]}
                        />}
                </>

                {isLogin && <Button
                    type="link"
                    style={{
                        float: 'right',
                        marginBlockEnd: 16
                    }}
                    onClick={() => naigate('/register')}
                >
                    没有账号？去注册
                </Button>}
            </LoginFormPage>
        </div>
    );
};

export default Login;