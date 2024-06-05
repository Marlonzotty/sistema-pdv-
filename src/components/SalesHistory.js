import React, { useState, useEffect } from 'react';
import api from '../services/api';

function SalesHistory() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Buscar histórico de vendas da API
    api.get('/sales')
      .then(response => setSales(response.data))
      .catch(error => console.error('Erro ao buscar histórico de vendas:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Histórico de Vendas</h2>
      {sales.length === 0 ? (
        <p>Nenhuma venda registrada.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Data</th>
                <th className="py-2 px-4 border-b">Itens</th>
                <th className="py-2 px-4 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{new Date(sale.date).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">
                    <ul>
                      {sale.items.map(item => (
                        <li key={item.id}>{item.name} - R${item.price.toFixed(2)}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 border-b">R${sale.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SalesHistory;
