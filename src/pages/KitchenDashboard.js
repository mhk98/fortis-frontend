import React from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { FiArrowRightCircle } from 'react-icons/fi';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom/cjs/react-router-dom';
// import { ArrowRightCircleIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const areas = [
  { id: 1, name: 'Kitchen Pending KOT', color: 'bg-yellow-500' },
  { id: 2, name: 'Kitchen Complete KOT', color: 'bg-gray-500' },

];

export default function KitchenDashboard() {

    const now = new Date();

const day = String(now.getDate()).padStart(2, '0');        // 18
const month = String(now.getMonth() + 1).padStart(2, '0'); // 05 (months are 0-based)
const year = String(now.getFullYear());          // 25 (last two digits)

const formattedDate = `${day}-${month}-${year}`;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
        <div className="bg-gray-200 px-2 py-3 my-2">
        <nav className="flex justify-between items-center text-gray-500 text-sm space-x-2">
          <div className='flex justify-between items-center space-x-2'>
          <IoHome className="w-4 h-4" />
          <span>Kitchen Dashboard</span>
          </div>
          <div>
          <span>Current Date {formattedDate}</span>
          </div>
          <div>
          </div>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
     
          <div
           
            className={`relative text-white rounded shadow-lg overflow-hidden ${'bg-yellow-400'}`}
          >
            <div className="flex items-center px-4 py-6">
              <FaBriefcase className="h-16 w-16 text-white/30 mr-4" />
              <h2 className="text-2xl font-light">Kitchen Pending KOT</h2>
            </div>
            <div>
              <Link className={`${'bg-yellow-500'} bg-opacity-80 px-4 py-2 flex justify-between items-center`} to='/app/pending-kot'>
              <span className="text-sm uppercase">View More</span>
              <FiArrowRightCircle className="h-5 w-5 text-white/70" />
              </Link>
            </div>
          </div>

          <div
           
            className={`relative text-white rounded shadow-lg overflow-hidden ${'bg-gray-400'}`}
          >
            <div className="flex items-center px-4 py-6">
              <FaBriefcase className="h-16 w-16 text-white/30 mr-4" />
              <h2 className="text-2xl font-light">Kitchen Complete KOT</h2>
            </div>
            <div>
              <Link className={`${'bg-gray-500'} bg-opacity-80 px-4 py-2 flex justify-between items-center`} to='/app/complete-kot'>
              <span className="text-sm uppercase">View More</span>
              <FiArrowRightCircle className="h-5 w-5 text-white/70" />
              </Link>
            </div>
          </div>
   
      </div>
    </div>
  );
}
