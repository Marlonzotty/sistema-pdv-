import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Checkout() {
  const cart = useSelector(state => state.cart.items);
  const total = cart.reduce((acc, product) => acc + product.price, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePayment = () => {
    // Preparar os dados da venda
    const saleData = {
      items: cart,
      total,
      date: new Date().toISOString() // Adicionar data
    };

    // Enviar dados para o histórico de vendas
    api.post('/sales', saleData)
      .then(() => {
        // Limpar o carrinho
        dispatch({ type: 'CLEAR_CART' });
        // Redirecionar para o histórico de vendas
        navigate('/sales-history');
      })
      .catch(error => console.error('Erro ao registrar a venda:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Preço</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">R${product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Total: R${total.toFixed(2)}</h3>
      </div>
      <div className="mt-4">
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
        >
          Pagamento Realizado
        </button>
      </div>
    </div>
  );
}

export default Checkout;