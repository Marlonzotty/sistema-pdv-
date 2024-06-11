import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Checkout() {
  const cart = useSelector(state => state.cart.items);
  const total = cart.reduce((acc, product) => acc + product.price, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('Dinheiro');
  const [amountReceived, setAmountReceived] = useState(0);

  const handlePayment = () => {
    if (amountReceived < total) {
      alert('O valor recebido é menor que o total da compra.');
      return;
    }

    const saleData = {
      items: cart,
      total,
      paymentMethod,
      date: new Date().toISOString()
    };

    api.post('/sales', saleData)
      .then(() => {
        dispatch({ type: 'CLEAR_CART' });
        navigate('/sales-history');
      })
      .catch(error => console.error('Erro ao registrar a venda:', error));
  };

  const change = amountReceived - total;

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
        <label className="block mb-2">Valor Recebido:</label>
        <input
          type="number"
          value={amountReceived}
          onChange={(e) => setAmountReceived(parseFloat(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Digite o valor recebido"
        />
        <h3 className="text-xl font-bold">Troco: R${change.toFixed(2)}</h3>
      </div>
      <div className="mt-4">
        <label className="block mb-2">Método de Pagamento:</label>
        <div className="flex space-x-4">
          <button
            onClick={() => setPaymentMethod('Dinheiro')}
            className={`px-4 py-2 rounded ${paymentMethod === 'Dinheiro' ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
          >
            Dinheiro
          </button>
          <button
            onClick={() => setPaymentMethod('Cartão')}
            className={`px-4 py-2 rounded ${paymentMethod === 'Cartão' ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
          >
            Cartão
          </button>
          <button
            onClick={() => setPaymentMethod('Pix')}
            className={`px-4 py-2 rounded ${paymentMethod === 'Pix' ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
          >
            Pix
          </button>
        </div>
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
