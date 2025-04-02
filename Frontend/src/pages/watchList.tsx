import React, { useState } from 'react';

type Stock = {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

const availableStocks: Stock[] = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.', price: 175.36, change: -1.25, changePercent: -0.71 },
  { id: 2, symbol: 'TSLA', name: 'Tesla Inc.', price: 234.78, change: +3.45, changePercent: +1.49 },
  { id: 3, symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2895.67, change: +12.89, changePercent: +0.45 },
  { id: 4, symbol: 'MSFT', name: 'Microsoft Corp.', price: 312.45, change: -0.45, changePercent: -0.14 },
];

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const addStock = (stock: Stock) => {
    if (!watchlist.find((item) => item.id === stock.id)) {
      setWatchlist([...watchlist, stock]);
    }
  };
  const removeStock = (id: number) => {
    setWatchlist(watchlist.filter((stock) => stock.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">📈 My Watchlist</h2>

      {/* Dropdown to Add Stocks */}
      <div className="mb-4 flex space-x-4">
        <select
          className="p-2 border border-gray-300 rounded-lg"
          onChange={(e) => {
            const stock = availableStocks.find((s) => s.id === Number(e.target.value));
            if (stock) addStock(stock);
          }}
        >
          <option value="">Select a stock to add</option>
          {availableStocks.map((stock) => (
            <option key={stock.id} value={stock.id}>
              {stock.symbol} - {stock.name}
            </option>
          ))}
        </select>
      </div>

      {/* Watchlist Table */}
      <table className="w-full text-left border-collapse">
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
                <td className="p-3 font-semibold">{stock.symbol} - {stock.name}</td>
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
              <td colSpan={4} className="p-4 text-center text-gray-500">No stocks in your watchlist</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;
