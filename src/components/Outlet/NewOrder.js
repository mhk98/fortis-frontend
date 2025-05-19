// import { useState } from 'react';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// export default function NewOrder() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isOpen1, setIsOpen1] = useState(true);
//   const [isOpen2, setIsOpen2] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("Indian");

//   const categories = [
//     "All Item",
//     "Others",
//     "Bangladeshi",
//     "Continental",
//     "Thai",
//     "Soft Drink",
//     "Chinese",
//     "Indian",
//   ];

//   const items = [
//     {
//       name: "Chicken Tandoori",
//       price: 300.0,
//       kitchen: "Indian",
//     },
//   ];

//   return (
//     <div className="border rounded-md shadow-md">
//       {/* Header */}
//       <div
//         className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="flex items-center gap-2">
//           <span className="text-lg font-semibold">🎁 New Order</span>
//         </div>
//         {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
//       </div>

//       {/* Body */}
//       {isOpen && (
//         <div>
//             <div className="p-4 bg-white">
//           {/* Running Table */}
//           <div className="mb-4">
//             <label className="text-gray-700 font-medium">Running Table =&gt;</label>
//             <div className="inline-flex gap-2 ml-3">
//               <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
//               <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
//             </div>
//           </div>

//           {/* Form Inputs */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Bill NO */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Bill NO (39)</label>
//               <input
//                 type="text"
//                 value="40"
//                 readOnly
//                 className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2"
//               />
//             </div>

//             {/* Table NO */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Table NO</label>
//               <input
//                 type="text"
//                 placeholder="Table Number"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//             </div>

//             {/* Room NO */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Room NO</label>
//               <input
//                 type="text"
//                 placeholder="Room Number"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//             </div>

//             {/* Serve Time */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Serve Time</label>
//               <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
//                 <option>BREAKFAST</option>
//                 <option>LUNCH</option>
//                 <option>DINNER</option>
//               </select>
//             </div>

//             {/* PAX */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">PAX</label>
//               <input
//                 type="number"
//                 placeholder="Number Of Guest"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//             </div>

//             {/* Guest Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Guest Name</label>
//               <input
//                 type="text"
//                 placeholder="Guest Name"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//             </div>

//             {/* Terminal */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Terminal</label>
//               <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
//                 <option>COFFEE SHOP</option>
//                 <option>RESTAURANT</option>
//               </select>
//             </div>

//             {/* Contact No */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Contact No</label>
//               <input
//                 type="text"
//                 placeholder="Contact Number"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white">
//       {/* Item List */}
//       <div className="w-full border rounded shadow-sm">
//         <div 
//         onClick={() => setIsOpen1(!isOpen1)}
//         className="bg-blue-600 text-white p-3 flex justify-between items-center cursor-pointer">
//           <h2 className="text-base font-semibold flex items-center gap-1">📌 Item List</h2>
//           {isOpen1 ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}

//         </div>

//       {
//         isOpen1 && (
//             <div>
//                   {/* Tabs */}
//         <div className="overflow-x-auto border-b">
//           <div className="flex gap-4 px-4 py-2 whitespace-nowrap text-sm">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`${
//                   selectedCategory === cat
//                     ? "border-b-2 border-red-500 font-medium"
//                     : "text-gray-600"
//                 } pb-1`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search and Table */}
//         <div className="p-4 overflow-x-auto">
//           <div className="flex justify-end mb-2">
//             <label className="text-sm mr-2">Search:</label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded px-2 py-1 text-sm"
//               placeholder="Search..."
//             />
//           </div>
//           <table className="w-full text-sm border border-gray-300">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-3 py-2 text-left">Name</th>
//                 <th className="border px-3 py-2 text-left">Price(s)</th>
//                 <th className="border px-3 py-2 text-left">Kitchen</th>
//                 <th className="border px-3 py-2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, idx) => (
//                 <tr key={idx} className="hover:bg-gray-50">
//                   <td className="border px-3 py-2">{item.name}</td>
//                   <td className="border px-3 py-2">{item.price.toFixed(2)}</td>
//                   <td className="border px-3 py-2">{item.kitchen}</td>
//                   <td className="border px-3 py-2">
//                     <button className="bg-blue-300 text-white px-3 py-1 rounded hover:bg-blue-400">
//                       Add
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {items.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="text-center py-4 text-gray-500">
//                     No items found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
//             <div>Showing 1 to 1 of 1 entry</div>
//             <div className="space-x-1">
//               <button className="border px-2 py-1 rounded hover:bg-gray-100">&laquo;</button>
//               <button className="border px-3 py-1 rounded bg-gray-200">1</button>
//               <button className="border px-2 py-1 rounded hover:bg-gray-100">&raquo;</button>
//             </div>
//           </div>
//         </div>
//             </div>
//         )
//       }
//       </div>

//       {/* Order Item List */}
//       <div className="w-full border rounded shadow-sm">
//         <div onClick={() => setIsOpen2(!isOpen2)} className="bg-teal-500 text-white p-3 flex justify-between items-center">
//           <h2 className="text-base font-semibold flex items-center gap-1">📌 Order Item List</h2>
//           {isOpen2 ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}

//         </div>

//         {
//             isOpen2 && (
//                 <div className="p-4 overflow-x-auto">
//           <table className="w-full text-sm border border-gray-300">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-3 py-2 text-left">Name</th>
//                 <th className="border px-3 py-2 text-left">Price(s)</th>
//                 <th className="border px-3 py-2 text-left">Quantity</th>
//                 <th className="border px-3 py-2 text-left">Kitchen</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-gray-500">
//                   No items added yet
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="mt-3 text-sm font-medium">
//             <span className="mr-2">Total:</span> <span className="text-gray-800">0</span>
//           </div>
//         </div>
//             )
//         }
//       </div>
//     </div>
//         </div>
//       )}



//     </div>
//   );
// }



import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function NewOrder() {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Indian");
  const [pax, setPax] = useState(""); // PAX input state

  const categories = [
    "All Item",
    "Others",
    "Bangladeshi",
    "Continental",
    "Thai",
    "Soft Drink",
    "Chinese",
    "Indian",
  ];

  const items = [
    {
      name: "Chicken Tandoori",
      price: 300.0,
      kitchen: "Indian",
    },
  ];

  return (
    <div className="border rounded-md shadow-md">
      {/* Header */}
      <div
        className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">🎁 New Order</span>
        </div>
        {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
      </div>

      {/* Body */}
      {isOpen && (
        <div>
          <div className="p-4 bg-white">
            {/* Running Table */}
            <div className="mb-4">
              <label className="text-gray-700 font-medium">Running Table =&gt;</label>
              <div className="inline-flex gap-2 ml-3">
                <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
                <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bill NO (39)</label>
                <input
                  type="text"
                  value="40"
                  readOnly
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Table NO</label>
                <input
                  type="text"
                  placeholder="Table Number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Room NO</label>
                <input
                  type="text"
                  placeholder="Room Number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Serve Time</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                  <option>BREAKFAST</option>
                  <option>LUNCH</option>
                  <option>DINNER</option>
                </select>
              </div>

              {/* PAX Input triggers opening sections */}
              <div>
                <label className="block text-sm font-medium text-gray-700">PAX</label>
                <input
                  type="number"
                  placeholder="Number Of Guest"
                  value={pax}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPax(value);
                    if (value) {
                      setIsOpen1(true);
                      setIsOpen2(true);
                   
                    }
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Guest Name</label>
                <input
                  type="text"
                  placeholder="Guest Name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Terminal</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                  <option>COFFEE SHOP</option>
                  <option>RESTAURANT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact No</label>
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white">
            {/* Item List */}
            <div className="w-full border rounded shadow-sm">
              <div
                onClick={() => setIsOpen1(true)}
                className="bg-blue-600 text-white p-3 flex justify-between items-center cursor-pointer"
              >
                <h2 className="text-base font-semibold flex items-center gap-1">📌 Item List</h2>
                {isOpen1 ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
              </div>

              {isOpen1 && (
                <div>
                  <div className="overflow-x-auto border-b">
                    <div className="flex gap-4 px-4 py-2 whitespace-nowrap text-sm">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`${
                            selectedCategory === cat
                              ? "border-b-2 border-red-500 font-medium"
                              : "text-gray-600"
                          } pb-1`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 overflow-x-auto">
                    <div className="flex justify-end mb-2">
                      <label className="text-sm mr-2">Search:</label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="Search..."
                      />
                    </div>
                    <table className="w-full text-sm border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-3 py-2 text-left">Name</th>
                          <th className="border px-3 py-2 text-left">Price(s)</th>
                          <th className="border px-3 py-2 text-left">Kitchen</th>
                          <th className="border px-3 py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="border px-3 py-2">{item.name}</td>
                            <td className="border px-3 py-2">{item.price.toFixed(2)}</td>
                            <td className="border px-3 py-2">{item.kitchen}</td>
                            <td className="border px-3 py-2">
                              <button className="bg-blue-300 text-white px-3 py-1 rounded hover:bg-blue-400">
                                Add
                              </button>
                            </td>
                          </tr>
                        ))}
                        {items.length === 0 && (
                          <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">
                              No items found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                      <div>Showing 1 to 1 of 1 entry</div>
                      <div className="space-x-1">
                        <button className="border px-2 py-1 rounded hover:bg-gray-100">&laquo;</button>
                        <button className="border px-3 py-1 rounded bg-gray-200">1</button>
                        <button className="border px-2 py-1 rounded hover:bg-gray-100">&raquo;</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Item List */}
            <div className="w-full border rounded shadow-sm">
              <div
                onClick={() => setIsOpen2(true)}
                className="bg-teal-500 text-white p-3 flex justify-between items-center cursor-pointer"
              >
                <h2 className="text-base font-semibold flex items-center gap-1">📌 Order Item List</h2>
                {isOpen2 ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
              </div>

              {isOpen2 && (
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-sm border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2 text-left">Name</th>
                        <th className="border px-3 py-2 text-left">Price(s)</th>
                        <th className="border px-3 py-2 text-left">Quantity</th>
                        <th className="border px-3 py-2 text-left">Kitchen</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="4" className="text-center py-4 text-gray-500">
                          No items added yet
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-3 text-sm font-medium">
                    <span className="mr-2">Total:</span> <span className="text-gray-800">0</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
