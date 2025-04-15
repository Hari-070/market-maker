import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';

type Stock = {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

const Watchlist = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getStocks = async () => {
      try {
        const res = await axios.get('http://172.17.5.227:5000/api/trending');
        const formattedStocks = res.data.all_stocks.map((stock: any, index: number) => ({
          id: index,
          symbol: stock.symbol,
          name: stock.price,
          price: parseFloat(stock.change_percent) || 0,
          change: parseFloat(stock.market_cap) || 0,
          changePercent: parseFloat(stock.volume) || 0,
        }));
        setStocks(formattedStocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    getStocks();
  }, []);

  const addStock = (stock: Stock) => {
    if (!watchlist.find((item) => item.id === stock.id)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  const removeStock = (id: number) => {
    setWatchlist(watchlist.filter((stock) => stock.id !== id));
  };

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-r from-[#005aa7] to-[#fffde4] p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">📈 My Watchlist</h2>

      <input
        type="text"
        placeholder="Search stocks..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg w-full mb-4"
      />

      {searchTerm && (
        <ul className="bg-white border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
          {filteredStocks.map((stock) => (
            <li
              key={stock.id}
              onClick={() => addStock(stock)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {stock.symbol} - {stock.name}
            </li>
          ))}
        </ul>
      )}

      <table className="w-full text-left border-collapse mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Stock</th>
            <th className="p-3">Price ($)</th>
            <th className="p-3">Change</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.length > 0 ? (
            watchlist.map((stock) => (
              <tr key={stock.id} className="border-t">
                <td className="p-3 font-semibold">
                  {stock.symbol} - {stock.name}
                </td>
                <td className="p-3">${stock.price.toFixed(2)}</td>
                <td className={`p-3 font-bold ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}> 
                  {stock.change > 0 ? `+${stock.change.toFixed(2)}` : stock.change.toFixed(2)}
                  ({stock.changePercent.toFixed(2)}%)
                </td>
                <td className="p-3">
                  <button
                    onClick={() => removeStock(stock.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Remove ❌
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No stocks in your watchlist
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold text-gray-900 mt-6">Stock Price Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={watchlist}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="symbol" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </>
  );
};

export default Watchlist;
