import React,{useEffect, useState} from 'react';
import { TrendingUp, Newspaper } from 'lucide-react';
import axios from 'axios';

const Home = () => {

  const [stocks,setStocks]=useState([{}])

  const getStocks=async()=>{
    try {
      await axios.get('http://172.17.19.171:5000/api/trending-stocks')
      .then((res)=>{
        setStocks(res.data)
        console.log(stocks)
      })
    } catch (error) {
      console.log("there is an error")
    }
  }

  useEffect(()=>{
    getStocks()
},[])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-8">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Trending Stocks</h2>
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-4">
              {/* Placeholder for trending stocks */}
              {[1,2,3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">AAPL</h3>
                    <p className="text-sm text-gray-500">Apple Inc.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$150.23</p>
                    <p className="text-sm text-green-500">+2.5%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* News Sidebar */}
        <div className="col-span-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Market News</h2>
              <Newspaper className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-4">
              {/* Placeholder for news items */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-medium mb-1">Market Update {i}</h3>
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
}

export default Home