import React, { useState } from 'react';

interface Stock {
  symbol: string;
  name: string;
}

const sampleStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
];

const Watchlist: React.FC = () => {
  const [stack, setStack] = useState<Stock[]>(sampleStocks);

  // Add stock to the stack
  const addStock = (symbol: string, name: string) => {
    setStack((prevStack) => [...prevStack, { symbol, name }]);
  };

  // Remove stock (LIFO)
  const removeStock = () => {
    if (stack.length === 0) return;
    setStack((prevStack) => prevStack.slice(0, -1));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">📊 Stack-Based Watchlist</h1>

      <div className="flex gap-3 mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => addStock('NFLX', 'Netflix Inc.')}
        >
          Add Netflix 🎬
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          onClick={removeStock}
        >
          Remove Last ❌
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Stock Symbol</th>
              <th className="p-3">Company Name</th>
            </tr>
          </thead>
          <tbody>
            {stack.map((stock, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{stock.symbol}</td>
                <td className="p-3">{stock.name}</td>
              </tr>
            ))}
            {stack.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center p-4 text-gray-500">
                  No stocks in the stack
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
