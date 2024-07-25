import React, { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  InputNumber,
  notification,
} from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ADD_PRODUCTS_URL } from '../../Backend/apis';

import useFetchProductsData from '../../Hooks/useFetchProductsData';

const CreateProduct: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // Methods
  const handleOk = () => {
    form.submit();
  };

  const fetchProductsData = useFetchProductsData();

  const onFinish = async (values: any) => {
    try {
      const url = ADD_PRODUCTS_URL;
      const jwtToken = Cookies.get('jwtToken');
      const response = await axios.post(url, values, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log('API response:', response.data);
      notification.success({
        message: 'Product Created',
        description: 'The product has been successfully created.',
      });
      setOpen(false);
      form.resetFields();
      fetchProductsData(); // Re-fetch customer data
    } catch (error) {
      console.error('API error:', error);
      notification.error({
        message: 'Error',
        description: 'There was an error creating the product.',
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
        Create Product
      </Button>
      <Modal
        title="Create Product"
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
                label="Product Name"
                name="name"
                rules={[
                  { required: true, message: 'Please input the product name!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Internal Name"
                name="internal_name"
                rules={[
                  {
                    required: true,
                    message: 'Please input the internal name!',
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
                label="Description"
                name="description"
                rules={[
                  { required: true, message: 'Please input the description!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Charge Method"
                name="charge_method"
                rules={[
                  { required: true, message: 'Please select a charge method!' },
                ]}
              >
                <Select>
                  <Select.Option value="monthly">Monthly</Select.Option>
                  <Select.Option value="yearly">Yearly</Select.Option>
                  <Select.Option value="quarterly">Quarterly</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Currency"
                name="currency"
                rules={[
                  { required: true, message: 'Please select a currency!' },
                ]}
              >
                <Select>
                  <Select.Option value="usd">USD</Select.Option>
                  <Select.Option value="ind">IND</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Unit Price"
                name="unit_price"
                rules={[
                  { required: true, message: 'Please input the unit price!' },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  { required: true, message: 'Please select the status!' },
                ]}
              >
                <Select>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProduct;
