import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products')
      .then(response => {
        dispatch({ type: 'SET_PRODUCTS', payload: response.data });
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, [dispatch]);

  const handleEdit = (product) => {
    navigate(`/edit-product/${product.id}`);
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
      <div className="mb-4">
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
        >
          Adicionar Produto
        </button>
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
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">R${product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => handleEdit(product)} 
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-200 mr-2"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleAddToCart(product)} 
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Adicionar ao Carrinho
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

export default ProductList;
