import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../services/api';

function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => {
        setName(response.data.name);
        setPrice(response.data.price.toString().replace('.', ','));
      })
      .catch(error => console.error('Erro ao buscar produto:', error));
  }, [id]);

  const handlePriceChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = (Number(value) / 100).toFixed(2); // Divide por 100 e fixa 2 casas decimais
    setPrice(value.toString().replace('.', ',')); // Substitui ponto por vírgula
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { name, price: parseFloat(price.replace(',', '.')) };

    api.put(`/products/${id}`, updatedProduct)
      .then(() => {
        dispatch({ type: 'UPDATE_PRODUCT', payload: { id, ...updatedProduct } });
        navigate('/products');
      })
      .catch(error => {
        console.error('Erro ao atualizar produto:', error);
        alert('Erro ao atualizar produto. Verifique a conexão com o servidor.');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Editar Produto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do Produto"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="Preço"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
