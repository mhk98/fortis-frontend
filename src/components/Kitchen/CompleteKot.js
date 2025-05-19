import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { LuRefreshCw } from "react-icons/lu";

export default function CompleteHistory() {
  const [isOpen, setIsOpen] = useState(true);

  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');        // 18
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 05 (months are 0-based)
  const year = String(now.getFullYear());          // 25 (last two digits)
  
  const formattedDate = `${day}-${month}-${year}`;

  return (
    <div className="border rounded-md shadow-md w-full max-w-full overflow-hidden">
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
      {/* Header */}
      <div
        className="bg-yellow-700 text-white px-4 py-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
          🎁 Kitchen Complete KOT History
        </h2>
        <div className="flex items-center gap-2">
          <LuRefreshCw size={18} className="hover:rotate-180 transition-transform duration-200" />
          {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="p-4 bg-white">
          {/* Export Buttons & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex flex-wrap gap-2">
              {['CSV', 'Excel', 'PDF', 'Print'].map((label) => (
                <button
                  key={label}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 text-sm"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="w-full md:w-auto">
              <label className="text-sm text-gray-600 mr-2">Search:</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-1 text-sm w-full md:w-64"
                placeholder="Type to search..."
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  {[
                    'Bill No.',
                    'T/R',
                    'Terminal',
                    'Serve Time',
                    'PAX',
                    'Water Name',
                    'Gust Name',
                    'Company Name',
                    'E-mail',
                    'Contact No',
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 border border-gray-200 text-left whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="10" className="text-center text-gray-500 py-6">
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-gray-600 gap-2">
            <div>Showing 0 to 0 of 0 entries</div>
            <div className="space-x-2">
              <button className="px-2 py-1 border rounded hover:bg-gray-100">&laquo;</button>
              <button className="px-2 py-1 border rounded hover:bg-gray-100">1</button>
              <button className="px-2 py-1 border rounded hover:bg-gray-100">&raquo;</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
