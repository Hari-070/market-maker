import React, { useState, useEffect } from 'react';
import { TrendingUp, Newspaper } from 'lucide-react';
import { message } from 'antd';

const Home = () => {
  const [images] = useState([
    './assets/1.jpg',
    './assets/2.jpg',
    './assets/3.webp',
    './assets/4.webp',
    './assets/5.webp',
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [images.length]);

  useEffect(() => {
    message.success('Welcome to StockTracker! Stay updated with the latest stocks and market news.');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="flex">
        {/* Left Side: Image Slider */}
        <div className="w-1/2 h-full overflow-hidden relative">
          <div
            className="absolute inset-0 left-0 w-full h-full flex"
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`, // Slide effect for images
              transition: 'transform 1s ease-in-out',
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="flex-none w-full h-full">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full filter blur-[4px] opacity-90"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Information Content */}
        <div className="w-1/2 p-8">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-900">Trending Stocks</h2>
              <TrendingUp className="h-6 w-6 text-blue-600" aria-label="Trending Stocks" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-gray-200 transition-all"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">AAPL</h3>
                    <p className="text-sm text-gray-500">Apple Inc.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">$150.23</p>
                    <p className="text-sm text-green-500">+2.5%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-900">Market News</h2>
              <Newspaper className="h-6 w-6 text-blue-600" aria-label="Market News" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-4 last:border-b-0 hover:bg-gray-100 transition-all rounded-md p-3">
                  <h3 className="font-medium text-gray-900 mb-1">Market Update {i}</h3>
                  <p className="text-sm text-gray-600">Latest market news and updates...</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
