import React, { useState } from 'react';
import { Button, Modal, Form, Input, Row, Col, notification } from 'antd';
import axios from 'axios';
import { ICustomer } from '../../Interfaces/customer.interface';
import { ADD_CUSTOMER_URL, FETCH_CUSTOMERS_URL } from '../../Backend/apis';
import {
  fetchCustomersFailure,
  fetchCustomersStart,
  fetchCustomersSuccess,
} from '../../Store/slices/customerSlice';
import useFetchData from '../../Hooks/useFetchData';

const CreateCustomer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // Methods
  const handleOk = () => {
    form.submit();
  };

  // Update Customers Page
  const dataDetails = {
    url: FETCH_CUSTOMERS_URL,
    startAction: fetchCustomersStart,
    successAction: fetchCustomersSuccess,
    failureAction: fetchCustomersFailure,
  };

  const fetchData = useFetchData(dataDetails);

  const onFinish = async (values: ICustomer) => {
    try {
      const url = ADD_CUSTOMER_URL;
      const jwtToken = Cookies.get('jwtToken');
      const response = await axios.post(url, values, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log('API response:', response.data);
      notification.success({
        message: 'Customer Created',
        description: 'The customer has been successfully created.',
      });
      setOpen(false);
      form.resetFields();
      fetchData(); // Re-fetch customer data
    } catch (error) {
      console.error('API error:', error);
      notification.error({
        message: 'Error',
        description: 'There was an error creating the customer.',
      });
    }
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create Customer
      </Button>
      <Modal
        title="Create Customer"
        centered
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Add
          </Button>,
        ]}
        width={1000}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={40}>
            <Col span={12}>
              <Form.Item
                label="Legal Company Name"
                name="legal_company_name"
                rules={[
                  {
                    required: true,
                    message: 'Please input the legal company name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Default Currency"
                name="default_currency"
                rules={[
                  {
                    required: true,
                    message: 'Please input the default currency!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: 'Please input the address!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Unit/Floor"
                name="unit_floor"
                rules={[
                  { required: true, message: 'Please input the unit/floor!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please input the city!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: 'Please input the state!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Postal Code"
                name="postal_code"
                rules={[
                  { required: true, message: 'Please input the postal code!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: 'Please input the country!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCustomer;
