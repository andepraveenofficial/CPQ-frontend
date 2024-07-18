import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Define interfaces
interface MenuItemType {
  key: string;
  label: string;
  link: string;
}

const menuItems: MenuItemType[] = [
  {
    key: 'proposals',
    label: 'Proposals',
    link: '/proposals',
  },
  {
    key: 'subscriptions',
    label: 'Subscriptions',
    link: '/subscriptions',
  },
  {
    key: 'invoices',
    label: 'Invoices',
    link: '/invoices',
  },
  {
    key: 'customers',
    label: 'Customers',
    link: '/customers',
  },
  {
    key: 'products',
    label: 'Products',
    link: '/products',
  },
];
const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('jwtToken');
    navigate('/signin');
  };

  return (
    <Layout.Sider width={250} theme="light" style={{ height: '100vh' }}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Menu mode="inline" defaultSelectedKeys={['proposals']}>
          {menuItems.map((item) => {
            return (
              <Menu.Item key={item.key}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
        <Button
          onClick={handleLogout}
          style={{ margin: '16px' }}
          type="primary"
          danger
        >
          Logout
        </Button>
      </div>
    </Layout.Sider>
  );
};

export default Sidebar;
