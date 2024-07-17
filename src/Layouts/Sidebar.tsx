import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

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
  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        width={250}
        theme="light"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['proposals']}
            style={{ flex: 1, borderRight: 0 }}
          >
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
      </Sider>
    </Layout>
  );
};

export default Sidebar;
