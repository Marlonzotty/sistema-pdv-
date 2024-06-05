import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/products" className="text-blue-500 hover:underline">Produtos</Link>
          <Link to="/cart" className="text-blue-500 hover:underline">Carrinho</Link>
          <Link to="/checkout" className="text-blue-500 hover:underline">Checkout</Link>
          <Link to="/sales-history" className="text-blue-500 hover:underline">Histórico de Vendas</Link>
          <Link to="/sales-reports" className="text-blue-500 hover:underline">Relatórios de Vendas</Link>
        </nav>
      </div>
    </div>
  );
}

export default Dashboard;
