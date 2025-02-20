import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { FormProps } from 'antd';
import Cookies from 'js-cookie';
import { Button, Form, Input, Typography } from 'antd';
import './signup.scss';
import { SIGN_UP_URL } from '../../Backend/apis';

type FieldType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const [signupErr, setSignupErr] = useState<string>('');
  const { Title, Paragraph } = Typography;

  const navigate = useNavigate();
  const jwtToken = Cookies.get('jwtToken');

  if (jwtToken) return <Navigate to="/" />;
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const url = SIGN_UP_URL;
      await axios.post(url, values);
      navigate('/signin');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setSignupErr(`${err.response.data.message} with that Email`);
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
            {' '}
            REGISTRATION
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
              label="First Name"
              name="firstname"
              rules={[
                { required: true, message: 'please enter your firstname' },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'First name can only contain letters and spaces',
                },
              ]}
            >
              <Input placeholder="First Name" autoComplete="off" />
            </Form.Item>
            <Form.Item<FieldType>
              layout="vertical"
              label="Last Name"
              name="lastname"
              rules={[
                { required: true, message: 'please enter your lastname' },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'Lastname can only contain letters',
                },
              ]}
            >
              <Input placeholder="Last Name" autoComplete="off" />
            </Form.Item>
            <Form.Item<FieldType>
              layout="vertical"
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'please enter your email' },
                { type: 'email', message: 'The email is not a valid email!' },
              ]}
            >
              <Input placeholder="email" autoComplete="off" />
            </Form.Item>

            <Form.Item<FieldType>
              layout="vertical"
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'please enter your password' },
                { min: 8, message: 'Password must be at least 8 characters,' },
                {
                  pattern: /^(?=.*[A-Z])/,
                  message: 'at least one capital letter,',
                },
                {
                  pattern: /^(?=.*\d)/,
                  message: 'at least one number,',
                },
                {
                  pattern: /^(?=.*[!@#$%^&*])/,
                  message: 'at least one special character',
                },
              ]}
            >
              <Input.Password
                placeholder="Enter Your Password"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              layout="vertical"
              label="Confirm Password"
              name="confirm_password"
              rules={[
                { required: true, message: 'Please Confirm Your Password' },
                ({ getFieldValue }) => {
                  return {
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('The two passwords do not match'),
                      );
                    },
                  };
                },
              ]}
            >
              <Input.Password
                placeholder="Confirm Your Password"
                className="inputField"
              />
            </Form.Item>
            <Form.Item>
              <div className="button-div">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="green-button"
                >
                  SIGN UP
                </Button>
              </div>
            </Form.Item>
            {signupErr && (
              <Form.Item>
                <Paragraph className="login-message">{signupErr}</Paragraph>
              </Form.Item>
            )}
          </Form>
          <div className="signup-link">
            Don&apos;t have an account?
            <a href="/signin">SignIn</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
