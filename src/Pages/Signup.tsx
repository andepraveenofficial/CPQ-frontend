import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Grid, Flex, Typography } from 'antd';
import { LOGO_URL } from '../Services/images';

import '../Styles/signupStyles.css';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

/*
interface IData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
*/

const Signup: React.FC = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();

  /*
     const onFormSubmit = (values: IData) => {
     const data = values;
     const jsonData = JSON.stringify(data);
     console.log(jsonData);
     };
  */

  return (
    <Row
      style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' }}
    >
      {/* Logo Section */}
      {!screens.xs && (
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          className="section"
          style={{ backgroundColor: '#06D001' }}
        >
          <Flex justify="center" align="center" style={{ height: '100%' }}>
            <img
              src={LOGO_URL}
              alt="Logo"
              style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
            />
          </Flex>
        </Col>
      )}

      {/* Form Section */}
      <Col
        xs={24}
        sm={12}
        md={12}
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
        }}
      >
        <Flex justify="center" align="center" style={{ height: '100%' }}>
          <Form
            layout="vertical"
            style={{
              width: '100%',
              padding: '10px',
              maxWidth: '750px',
              minHeight: '100vh',
            }}
            // onFinish={onFormSubmit}
          >
            <Title level={2} className="title">
              REGISTRATION
            </Title>

            <Form.Item
              label="Firstname"
              name="firstname"
              rules={[
                { required: true, message: 'Please Enter Your Firstname' },
              ]}
            >
              <Input
                placeholder="Enter Your Firstname"
                className="inputField"
              />
            </Form.Item>

            <Form.Item
              label="Lastname"
              name="lastname"
              rules={[
                { required: true, message: 'Please Enter Your Lastname' },
              ]}
            >
              <Input placeholder="Enter Your Lastname" className="inputField" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please Enter Your Email' },
                {
                  type: 'email',
                  message: 'Please enter a valid email address!',
                },
              ]}
            >
              <Input placeholder="Enter Your Email" className="inputField" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please Enter Your Password' },
              ]}
            >
              <Input.Password
                placeholder="Enter Your Password"
                className="inputField"
              />
            </Form.Item>

            <Form.Item
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

            <Flex align="center" vertical>
              <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" className="button" htmlType="submit">
                  Signup
                </Button>
              </Form.Item>
              <div>
                <Text>Already registered? </Text>
                <Text
                  style={{ color: '#1890ff', cursor: 'pointer' }}
                  onClick={() => {
                    return navigate('/signin');
                  }}
                >
                  Sign in
                </Text>
                <Text> here</Text>
              </div>
            </Flex>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
};

export default Signup;
