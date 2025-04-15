import React, { useState, useEffect } from 'react';
import { TrendingUp, Newspaper } from 'lucide-react';
import { message } from 'antd';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Home = () => {
  const [images] = useState([
    'https://www.bing.com/th/id/OIP.cPK2BNGFa4U4D_BOpzzEkwHaEq?w=188&h=106&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    'https://img.freepik.com/free-photo/grwoth-business-launch-success-improvement-concept_53876-128111.jpg?ga=GA1.1.1176099841.1743582418&semt=ais_hybrid',
    'https://www.bing.com/th/id/OIP.BGLdt72KAA9QghNma9xm9QHaEK?w=190&h=106&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [stocks,setStocks]=useState([])
  const [news,setNews]=useState([])

  const getStocks=async()=>{
    try {
      await axios.get('http://172.17.5.227:5000/api/trending')
      .then((res)=>{
        setStocks(res.data.stocks)
        setNews(res.data.news)
        console.log(res.data.news)
        // console.log(stocks)
      })
    } catch (error) {
      console.log("there is an error")
    }
  }

  useEffect(()=>{
    getStocks()
},[stocks])
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    message.success('Welcome to StockTracker! Stay updated with the latest stocks and market news.');
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-r from-[#005aa7] to-[#fffde4] p-6">
      {/* Image Section */}
      <div className="w-full h-96 overflow-hidden rounded-lg shadow-md mb-6">
        <img
          src={images[currentImageIndex]}
          alt="Stock Image"
          className={`object-cover w-full h-full transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Trending Stocks */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full lg:w-1/3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-blue-900">Trending Stocks</h2>
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-4">
          {stocks.map((i) => (
                <div key={i.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{i.name}</h3>
                    <p className="text-sm text-gray-500">{i.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${i.price}</p>
                    {i.change_percent[1]=='+'?<p className="text-sm text-green-500">{i.change_percent}</p>:<p className="text-sm text-red-500">{i.change_percent}</p>}
                    {/* <p className="text-sm text-green-500">{i.change_percent}</p> */}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Market News */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full lg:w-2/3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-blue-900">Market News</h2>
            <Newspaper className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-4">
          {news.map((i) => (
                <div key={i.title} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-medium mb-1">Market Update </h3>
                  <p className="text-sm text-gray-600">{i.title}</p>
                  <a href={i.link} className="text-xs text-gray-400 mt-1" target='_blank'>{i.link}</a>
                  {/* <p className="text-xs text-gray-400 mt-1">{i.link}</p> */}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;