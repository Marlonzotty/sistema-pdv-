import React, { useState, useEffect } from 'react';
import api from '../services/api';

function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [dailySales, setDailySales] = useState({});

  useEffect(() => {
    api.get('/sales')
      .then(response => {
        setSales(response.data);
        calculateDailySales(response.data);
      })
      .catch(error => console.error('Erro ao buscar histórico de vendas:', error));
  }, []);

  const calculateDailySales = (sales) => {
    const salesByDate = sales.reduce((acc, sale) => {
      const date = new Date(sale.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += sale.total;
      return acc;
    }, {});

    setDailySales(salesByDate);
  };

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
              {Object.keys(dailySales).map(date => (
                <tr key={date} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{date}</td>
                  <td className="py-2 px-4 border-b">
                    <ul>
                      {sales.filter(sale => new Date(sale.date).toLocaleDateString() === date).map(sale => (
                        <li key={sale.id}>{sale.items.map(item => item.name).join(', ')} - R${sale.total.toFixed(2)}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 border-b">R${dailySales[date].toFixed(2)}</td>
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
