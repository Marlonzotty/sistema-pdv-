import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const total = cart.reduce((acc, product) => acc + product.price, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Carrinho</h2>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">Total: R${total.toFixed(2)}</span>
          <button 
            onClick={handleCheckout}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Checkout
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Preço</th>
              <th className="py-2 px-4 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">R${product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => handleRemove(product.id)} 
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart;
