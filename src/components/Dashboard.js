import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';
import Cart from './Cart';
import Checkout from './Checkout';
import SalesHistory from './SalesHistory';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [darkMode, setDarkMode] = useState(false);
  const cartTotal = useSelector(state => state.cart.items.reduce((acc, product) => acc + product.price, 0));

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductList />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'sales':
        return <SalesHistory />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-blue-500'} text-white flex justify-between items-center`}>
        <h1 className="text-3xl font-bold">Dashboard || by Zotty</h1>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-700' : 'bg-blue-500'}`}
          >
            Produtos
          </button>
          <button
            onClick={() => setActiveTab('cart')}
            className={`px-4 py-2 rounded ${activeTab === 'cart' ? 'bg-blue-700' : 'bg-blue-500'}`}
          >
            Carrinho
          </button>
          <button
            onClick={() => setActiveTab('checkout')}
            className={`px-4 py-2 rounded ${activeTab === 'checkout' ? 'bg-blue-700' : 'bg-blue-500'}`}
          >
            Checkout
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-2 rounded ${activeTab === 'sales' ? 'bg-blue-700' : 'bg-blue-500'}`}
          >
            Histórico de Vendas
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">
            Total do Carrinho: R${cartTotal.toFixed(2)}
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded ${darkMode ? 'bg-yellow-500' : 'bg-gray-800'} text-white`}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
