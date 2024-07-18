import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import type { FormProps } from 'antd';
import { Button, Form, Input, Typography } from 'antd';
import '../App.css';
import { BASE_URL } from '../Services/APIs';

type FieldType = {
  email: string;
  password: string;
};
const Signin: React.FC = () => {
  const [loginMessage, setLoginMessage] = useState<string>('');
  const { Paragraph, Title } = Typography;
  const navigate = useNavigate();

  const jwtToken = Cookies.get('jwtToken');

  if (jwtToken) return <Navigate to="/" />;

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/users/login`,
        values,
      );
      const { token } = response.data;
      Cookies.set('jwtToken', token, { expires: 1 });
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setLoginMessage(err.response.data.message);
        }
      }
    }
  };

  return (
    <div className="signin-page">
      <div className="left-side">
        <div className="logo">
          <h1>CPQ</h1>
        </div>
      </div>
      <div className="login-container">
        <div className="cpq-heading-logo">
          <h1>CPQ</h1>
        </div>
        <div className="login-form">
          <Title level={2} className="heading">
            SIGNIN
          </Title>

          <Form
            layout="vertical"
            name="login"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              layout="vertical"
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'please enter your email' },
                { type: 'email', message: 'The email is not a valid email!' },
              ]}
            >
              <Input placeholder="email" autoComplete="current-password" />
            </Form.Item>

            <Form.Item<FieldType>
              layout="vertical"
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'please enter your password' },
              ]}
            >
              <Input.Password
                placeholder="enter your password"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <div className="button-div">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="green-button"
                >
                  SIGN IN
                </Button>
              </div>
            </Form.Item>
            {loginMessage && (
              <Form.Item>
                <Paragraph className="login-message">{loginMessage}</Paragraph>
              </Form.Item>
            )}
          </Form>
          <div className="signup-link">
            Don&apos;t have an account?
            <a href="/signup">Signup</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
