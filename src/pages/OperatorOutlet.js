import React, { useEffect, useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { FiArrowRightCircle } from 'react-icons/fi';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';

export default function OperatorOutlet() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/tblRestName');
        setAreas(response.data?.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchAreas();
  }, []);

  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

  // 🎨 Define different Tailwind color classes
  const colorClasses = [
    'bg-purple-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-teal-500',
    'bg-orange-500',
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-gray-200 px-2 py-3 my-2">
        <nav className="flex justify-between items-center text-gray-500 text-sm space-x-2">
          <div className='flex justify-between items-center space-x-2'>
            <IoHome className="w-4 h-4" />
            <span>Operator Outlet</span>
          </div>
          <div>
            <span>Current Date {formattedDate}</span>
          </div>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {areas.map((area, idx) => {
          const bgColor = colorClasses[idx % colorClasses.length];

          return (
            <div
              key={idx}
              className={`relative text-white rounded shadow-lg overflow-hidden ${bgColor}`}
            >
              <div className="flex items-center px-4 py-6">
                <FaBriefcase className="h-16 w-16 text-white/30 mr-4" />
                <h2 className="text-2xl font-light">{area.ResName}</h2>
              </div>
              <div>
                <Link
                  className={`${bgColor} bg-opacity-80 px-4 py-2 flex justify-between items-center`}
                  to={`/app/outlet/${area.ResSL}`}
                >
                  <span className="text-sm uppercase">Select {area.ResName}</span>
                  <FiArrowRightCircle className="h-5 w-5 text-white/70" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
