import React, { useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Card, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import styles from './CreateNewProposal.module.scss';
import { INewProposal } from '../../Interfaces/newproposal.interface';
import { RootState } from '../../Store/appStore';
import { ICustomer } from '../../Interfaces/customer.interface';
import { IProduct } from '../../Interfaces/product.interface';
import useFetchCustomersData from '../../Hooks/useFetchCustomersData';
import useFetchProductsData from '../../Hooks/useFetchProductsData';

const { Option } = Select;

const CreateNewProposal: React.FC = () => {
  const { customers } = useSelector((state: RootState) => {
    return state.customers;
  });

  const { products } = useSelector((state: RootState) => {
    return state.products;
  });

  const fetchCustomersData = useFetchCustomersData();
  const fetchProductsData = useFetchProductsData();

  useEffect(() => {
    fetchCustomersData();
    fetchProductsData();
  }, []);

  // Methods
  const handleFinish = (values: INewProposal) => {
    console.log('Form values:', values);
  };

  return (
    <div className={styles.createNewProposal}>
      <Form<INewProposal>
        layout="vertical"
        onFinish={handleFinish}
        className={styles.form}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Card title="Basic Information" className={styles.proposalCard}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="customerId"
                    label="Customer"
                    rules={[
                      { required: true, message: 'Please select a customer!' },
                    ]}
                  >
                    <Select placeholder="Select customer">
                      {customers.map((customer: ICustomer) => {
                        return (
                          <Option key={customer.id} value={customer.id}>
                            {customer.legal_company_name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="reference"
                    label="Proposal No."
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the reference!',
                      },
                    ]}
                  >
                    <Input placeholder="Reference (optional)" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="expiresAt"
                    label="Proposal expires"
                    rules={[
                      { required: true, message: 'Please select a date!' },
                    ]}
                  >
                    <DatePicker
                      format="MM/DD/YYYY"
                      placeholder="Select date"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Term">
                    <Form.Item
                      name="termQty"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the term quantity!',
                        },
                      ]}
                    >
                      <Input style={{ width: '60%' }} placeholder="12" />
                    </Form.Item>
                    <Form.Item name="termType" noStyle initialValue="Months">
                      <Select style={{ width: '40%' }}>
                        <Option value="Months">Months</Option>
                        <Option value="Years">Years</Option>
                      </Select>
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Card title="Products" className={styles.proposalCard}>
          <p>No products have been selected</p>
          <Select
            style={{ width: '100%' }}
            placeholder="Add product"
            optionFilterProp="children"
          >
            {products.map((product: IProduct) => {
              return (
                <Option key={product.id} value={product.id}>
                  {product.name}
                </Option>
              );
            })}
          </Select>
        </Card>

        <Form.Item className={styles.submitButtonContainer}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={styles.submitButton}
          >
            Create Proposal
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateNewProposal;
