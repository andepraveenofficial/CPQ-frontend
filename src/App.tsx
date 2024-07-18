import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Home from './Pages/Home';
import ProtectedRoute from './ProtectedRoute';
import Proposals from './Pages/Proposals';
import Products from './Pages/Products';
import Customers from './Pages/Customers';
import Subscriptions from './Pages/Subscriptions';
import Invoices from './Pages/Invoices';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="" element={<Proposals />} />
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<Customers />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="invoices" element={<Invoices />} />
            </Route>
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
