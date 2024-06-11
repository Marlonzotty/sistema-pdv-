import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../services/api';

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePriceChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = (Number(value) / 100).toFixed(2); // Divide por 100 e fixa 2 casas decimais
    setPrice(value.toString().replace('.', ',')); // Substitui ponto por vírgula
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      price: parseFloat(price.replace(',', '.')),
      quantity: parseInt(quantity, 10),
      weight: parseFloat(weight.replace(',', '.')),
    };

    api.post('/products', newProduct)
      .then(() => {
        dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
        navigate('/products');
      })
      .catch(error => console.error('Erro ao adicionar produto:', error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Adicionar Produto</h2>
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
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantidade"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Peso (kg)"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
