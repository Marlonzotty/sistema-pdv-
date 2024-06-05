import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SalesHistory from './components/SalesHistory';
import SalesReports from './components/SalesReports';
import EditProduct from './components/EditProduct';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
      <Route path="/add-product" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
      <Route path="/edit-product/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
      <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
      <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
      <Route path="/sales-history" element={<PrivateRoute><SalesHistory /></PrivateRoute>} />
      <Route path="/sales-reports" element={<PrivateRoute><SalesReports /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
