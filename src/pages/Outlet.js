import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { FiArrowRightCircle } from 'react-icons/fi';
import { IoHome } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom';
import NewOrder from '../components/Outlet/NewOrder';
import OrderHistory from '../components/Outlet/OrderHistory';


const kotData = [
  {
    label: 'Pending KOT',
    count: 2,
    color: 'bg-yellow-400',
    footer: 'bg-yellow-500',
  },
  {
    label: 'Complete KOT',
    count: 12,
    color: 'bg-gray-400',
    footer: 'bg-gray-500',
  },
  {
    label: 'Total KOT',
    count: 15,
    color: 'bg-purple-500',
    footer: 'bg-purple-600',
  },
  {
    label: 'Cash Print',
    count: 1,
    color: 'bg-teal-400',
    footer: 'bg-teal-500',
  },
];

const getCurrentDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function Outlet() {


    const [activeTab, setActiveTab] = useState(null)

    const isNewOrder = activeTab === "newOrder"
    const isHistoryOrder = activeTab === "historyOrder"

    const {ResName} = useParams()

    console.log("ResName", useParams())


  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-gray-50 p-4 rounded shadow">
        <div className="text-lg font-medium text-gray-700">
          <span className="inline-flex items-center gap-2">
          <IoHome className="w-4 h-4" />
            Dashboard <span className="font-bold">{ResName}</span>
          </span>
        </div>
        <div className="text-center mt-2 md:mt-0 text-sm text-gray-800 font-semibold">
          Current Date: {getCurrentDate()}
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <button onClick={() => setActiveTab("newOrder")} className="bg-teal-500 text-white px-4 py-2 rounded-full flex items-center gap-1 hover:bg-teal-600 transition">
            Take New Order <FaPlusCircle size={16} />
          </button>
          <button onClick={() => setActiveTab("historyOrder")} className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-1 hover:bg-blue-600 transition">
            Order History <Link size={16} />
          </button>
        </div>
        
      </div>

      {/* KOT Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kotData.map((item, index) => (
          <div key={index} className={`${item.color} text-white rounded shadow overflow-hidden`}>
            <div className="p-4 flex justify-between items-center">
              <div className="text-xl font-semibold">{item.count}</div>
              <div className="text-right text-lg">{item.label}</div>
            </div>
            <div className={`${item.footer} px-4 py-2 text-sm flex justify-between items-center cursor-pointer hover:opacity-90`}>
              VIEW MORE
              <FiArrowRightCircle className="h-5 w-5 text-white/70" />
            </div>
          </div>
        ))}
      </div>

      {activeTab && (
  <div className="mt-4 p-4 bg-white rounded-md">
    {isNewOrder ? (
      <div>
        <NewOrder/>
      </div>
    ) : (
      <div>
        <OrderHistory/>
      </div>
    )}
  </div>
)}

    </div>
  );
}
