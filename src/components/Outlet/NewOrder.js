// import { useEffect, useState } from 'react';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { useGetAllTblMenuQuery } from '../../features/tblMenu/tblMenu';
// import axios from 'axios';

// export default function NewOrder() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isOpen1, setIsOpen1] = useState(false);
//   const [isOpen2, setIsOpen2] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All Item");
//   const [pax, setPax] = useState("");
//   const [keyword, setKeyword] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [orderItems, setOrderItems] = useState([]);
//   const [totalResults, setTotalResults] = useState(0);

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


// const [items, setItems] = useState([])
// const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const fetchItems = async () => {
//       setIsLoading(true);
//       setIsError(false);

//       try {
//         const response = await axios.get('http://localhost:5000/api/v1/tblMenu', {
//           params: {
//             searchTerm: selectedCategory === 'All Item' ? '' : selectedCategory,
//             page: currentPage,
//             limit: itemsPerPage,
//           },
//         });

//         const data = response.data;
//         setItems(data?.data || []);
//         setTotalResults(data?.meta?.total || 0);
//         console.log('items', data?.data);
//       } catch (err) {
//         console.error('Error fetching items:', err);
//         setIsError(true);
//       }
//     };

//     fetchItems();
//   }, [keyword, selectedCategory, currentPage, itemsPerPage]);
//   console.log("items", items)

//   const handleAddItem = (item) => {
//     setOrderItems((prev) => {
//       const exists = prev.find((i) => i.repid === item.repid);
//       if (exists) {
//         return prev.map((i) =>
//           i.repid === item.repid ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const totalAmount = orderItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="border rounded-md shadow-md">
//       {/* Header */}
//       <div
//         className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span className="text-lg font-semibold">🎁 New Order</span>
//         {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
//       </div>

//       {/* Body */}
//       {isOpen && (
//         <div>
//           <div className="p-4 bg-white">
//             {/* Running Table */}
//             <div className="mb-4">
//               <label className="text-gray-700 font-medium">Running Table =&gt;</label>
//               <div className="inline-flex gap-2 ml-3">
//                 <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
//                 <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
//               </div>
//             </div>

//             {/* Form Inputs */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Bill NO (39)</label>
//                 <input type="text" value="40" readOnly className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Table NO</label>
//                 <input type="text" placeholder="Table Number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Room NO</label>
//                 <input type="text" placeholder="Room Number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Serve Time</label>
//                 <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
//                   <option>BREAKFAST</option>
//                   <option>LUNCH</option>
//                   <option>DINNER</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">PAX</label>
//                 <input
//                   type="number"
//                   placeholder="Number Of Guest"
//                   value={pax}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     setPax(value);
//                     if (value) {
//                       setIsOpen1(true);
//                       setIsOpen2(true);
//                     }
//                   }}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Guest Name</label>
//                 <input type="text" placeholder="Guest Name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Terminal</label>
//                 <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
//                   <option>COFFEE SHOP</option>
//                   <option>RESTAURANT</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Contact No</label>
//                 <input type="text" placeholder="Contact Number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//             </div>
//           </div>

//           {/* Two Column Layout */}
//           <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white">
//             {/* Item List */}
//             <div className="w-full border rounded shadow-sm">
//               <div
//                 onClick={() => setIsOpen1(true)}
//                 className="bg-blue-600 text-white p-3 flex justify-between items-center cursor-pointer"
//               >
//                 <h2 className="text-base font-semibold flex items-center gap-1">📌 Item List</h2>
//                 {isOpen1 ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
//               </div>

//               {isOpen1 && (
//                 <div>
//                   <div className="overflow-x-auto border-b">
//                     <div className="flex gap-4 px-4 py-2 whitespace-nowrap text-sm">
//                       {categories.map((cat) => (
//                         <button
//                           key={cat}
//                           onClick={() => {
//                             setSelectedCategory(cat);
//                             setKeyword('');
//                             setCurrentPage(1);
//                           }}
//                           className={`${
//                             selectedCategory === cat
//                               ? "border-b-2 border-red-500 font-medium"
//                               : "text-gray-600"
//                           } pb-1`}
//                         >
//                           {cat}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="p-4 overflow-x-auto">
//                     <div className="flex justify-end mb-2">
//                       <label className="text-sm mr-2">Search:</label>
//                       <input
//                         type="text"
//                         value={keyword}
//                         onChange={(e) => {
//                           setKeyword(e.target.value);
//                           setCurrentPage(1);
//                         }}
//                         className="border border-gray-300 rounded px-2 py-1 text-sm"
//                         placeholder="Search..."
//                       />
//                     </div>

//                     {isLoading && <div className="text-gray-500">Loading items...</div>}
//                     {/* {isError && <div className="text-red-500">Error: {error?.message}</div>} */}

//                     <table className="w-full text-sm border border-gray-300">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th className="border px-3 py-2 text-left">Name</th>
//                           <th className="border px-3 py-2 text-left">Price(s)</th>
//                           <th className="border px-3 py-2 text-left">Kitchen</th>
//                           <th className="border px-3 py-2"></th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {items.map((item, idx) => (
//                           <tr key={idx} className="hover:bg-gray-50">
//                             <td className="border px-3 py-2">{item.repname}</td>
//                             <td className="border px-3 py-2">{item.price?.toFixed(2)}</td>
//                             <td className="border px-3 py-2">{item.kitchen}</td>
//                             <td className="border px-3 py-2">
//                               <button
//                                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                                 onClick={() => handleAddItem(item)}
//                               >
//                                 Add
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                         {items.length === 0 && (
//                           <tr>
//                             <td colSpan="4" className="text-center py-4 text-gray-500">
//                               No items found
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>

//                     {/* Pagination */}
//                     <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
//                       <div>
//                         Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                         {Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults} entries
//                       </div>
//                       <div className="space-x-1">
//                         <button
//                           className="border px-2 py-1 rounded hover:bg-gray-100"
//                           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                           disabled={currentPage === 1}
//                         >
//                           &laquo;
//                         </button>
//                         <button className="border px-3 py-1 rounded bg-gray-200">{currentPage}</button>
//                         <button
//                           className="border px-2 py-1 rounded hover:bg-gray-100"
//                           onClick={() => setCurrentPage((prev) => prev + 1)}
//                           disabled={items.length < itemsPerPage}
//                         >
//                           &raquo;
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Order List */}
//             <div className="w-full border rounded shadow-sm">
//               <div
//                 onClick={() => setIsOpen2(true)}
//                 className="bg-teal-500 text-white p-3 flex justify-between items-center cursor-pointer"
//               >
//                 <h2 className="text-base font-semibold flex items-center gap-1">📌 Order Item List</h2>
//                 {isOpen2 ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
//               </div>

//               {isOpen2 && (
//                 <div className="p-4 overflow-x-auto">
//                   <table className="w-full text-sm border border-gray-300">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="border px-3 py-2 text-left">Name</th>
//                         <th className="border px-3 py-2 text-left">Price</th>
//                         <th className="border px-3 py-2 text-left">Quantity</th>
//                         <th className="border px-3 py-2 text-left">Kitchen</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orderItems.length === 0 ? (
//                         <tr>
//                           <td colSpan="4" className="text-center py-4 text-gray-500">
//                             No items added yet
//                           </td>
//                         </tr>
//                       ) : (
//                         orderItems.map((item, idx) => (
//                           <tr key={idx}>
//                             <td className="border px-3 py-2">{item.repname}</td>
//                             <td className="border px-3 py-2">{item.price?.toFixed(2)}</td>
//                             <td className="border px-3 py-2">{item.quantity}</td>
//                             <td className="border px-3 py-2">{item.kitchen}</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>

//                   <div className="mt-3 text-sm font-medium">
//                     <span className="mr-2">Total:</span> <span className="text-gray-800">{totalAmount.toFixed(2)}</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { CiTrash } from "react-icons/ci";
export default function NewOrder() {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Item");
  const [pax, setPax] = useState("");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [orderItems, setOrderItems] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axios.get('http://localhost:5000/api/v1/tblMenu', {
          params: {
            searchTerm: selectedCategory,
          },
        });

        const data = response.data;
        setItems(data?.data || []);
        setTotalResults(data?.data?.length || 0);
      } catch (err) {
        console.error('Error fetching items:', err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  const handleAddItem = (item) => {
    setOrderItems((prev) => {
      const exists = prev.find((i) => i.repid === item.repid);
      if (exists) {
        return prev.map((i) =>
          i.repid === item.repid ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const filteredItems = items.filter((item) =>
    item.repname.toLowerCase().includes(keyword.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="border rounded-md shadow-md">
      <div className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-semibold">🎁 New Order</span>
        {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
      </div>

      {isOpen && (
        <div>
          <div className="p-4 bg-white">
            <div className="mb-4">
              <label className="text-gray-700 font-medium">Running Table =&gt;</label>
              <div className="inline-flex gap-2 ml-3">
                <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
                <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" value="40" readOnly className="bg-gray-100 border rounded-md p-2" placeholder="Bill NO" />
              <input type="text" placeholder="Table Number" className="border rounded-md p-2" />
              <input type="text" placeholder="Room Number" className="border rounded-md p-2" />
              <select className="border rounded-md p-2">
                <option>BREAKFAST</option>
                <option>LUNCH</option>
                <option>DINNER</option>
              </select>
              <input type="number" value={pax} onChange={(e) => { const value = e.target.value; setPax(value); if (value) { setIsOpen1(true); setIsOpen2(true); } }} placeholder="Number Of Guest" className="border rounded-md p-2" />
              <input type="text" placeholder="Guest Name" className="border rounded-md p-2" />
              <select className="border rounded-md p-2">
                <option>COFFEE SHOP</option>
                <option>RESTAURANT</option>
              </select>
              <input type="text" placeholder="Contact Number" className="border rounded-md p-2" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white">
            <div className="w-full border rounded">
              <div className="bg-blue-600 text-white p-3 flex justify-between items-center cursor-pointer" onClick={() => setIsOpen1(true)}>
                <h2 className="text-base font-semibold">📌 Item List</h2>
                {isOpen1 ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
              </div>

              {isOpen1 && (
                <div>
                  <div className="flex gap-4 px-4 py-2 overflow-x-auto">
                    {categories.map((cat) => (
                      <button key={cat} onClick={() => { setSelectedCategory(cat); setKeyword(''); setCurrentPage(1); }}
                        className={`pb-1 ${selectedCategory === cat ? "border-b-2 border-red-500 font-medium" : "text-gray-600"}`}>
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-end mb-2">
                      <label className="text-sm mr-2">Search:</label>
                      <input type="text" value={keyword} onChange={(e) => { setKeyword(e.target.value); setCurrentPage(1); }} className="border px-2 py-1 text-sm rounded" placeholder="Search..." />
                    </div>

                    {isLoading && <div className="text-gray-500">Loading items...</div>}

                    <table className="w-full text-sm border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-3 py-2 text-left">Name</th>
                          <th className="border px-3 py-2 text-left">Price</th>
                          <th className="border px-3 py-2 text-left">Kitchen</th>
                          <th className="border px-3 py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedItems.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="border px-3 py-2">{item.repname}</td>
                            <td className="border px-3 py-2">{item.price?.toFixed(2)}</td>
                            <td className="border px-3 py-2">{item.kitchen}</td>
                            <td className="border px-3 py-2">
                              <button onClick={() => handleAddItem(item)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Add</button>
                            </td>
                          </tr>
                        ))}
                        {paginatedItems.length === 0 && (
                          <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">No items found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                      <div>
                        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length} entries
                      </div>
                      <div className="space-x-1">
                        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="border px-2 py-1 rounded hover:bg-gray-100">&laquo;</button>
                        <button className="border px-3 py-1 rounded bg-gray-200">{currentPage}</button>
                        <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage * itemsPerPage >= filteredItems.length} className="border px-2 py-1 rounded hover:bg-gray-100">&raquo;</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full border rounded">
              <div className="bg-green-600 text-white p-3 flex justify-between items-center cursor-pointer" onClick={() => setIsOpen2(!isOpen2)}>
                <h2 className="text-base font-semibold">📝 Order List</h2>
                {isOpen2 ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
              </div>

              {isOpen2 && (
                <div className="p-4">
                  <table className="w-full text-sm border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2 text-left">Item</th>
                        <th className="border px-3 py-2 text-left">Qty</th>
                        <th className="border px-3 py-2 text-left">Price</th>
                        <th className="border px-3 py-2 text-left">Total</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                      {orderItems.map((item, idx) => (
                        <tr key={idx}>
                          <td className="border px-3 py-2">{item.repname}</td>
                          <td className="border px-3 py-2">{item.quantity}</td>
                          <td className="border px-3 py-2">{item.price?.toFixed(2)}</td>
                          <td className="border px-3 py-2">{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                      {orderItems.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-gray-500">No items added</td>
                        </tr>
                      )}
                    </tbody> */}

              <tbody>
                {orderItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-3 py-2">{item.repname}</td>
                    <td className="border px-3 py-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          setOrderItems((prev) =>
                            prev.map((i) =>
                              i.repid === item.repid && i.quantity > 1
                                ? { ...i, quantity: i.quantity - 1 }
                                : i
                            )
                          )
                        }
                        className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() =>
                          setOrderItems((prev) =>
                            prev.map((i) =>
                              i.repid === item.repid
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                            )
                          )
                        }
                        className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </td>
                    <td className="border px-3 py-2">{item.price?.toFixed(2)}</td>
                    <td className="border px-3 py-2 flex items-center justify-between">
                      {(item.price * item.quantity).toFixed(2)}
                      <button
                        onClick={() =>
                          setOrderItems((prev) =>
                            prev.filter((i) => i.repid !== item.repid)
                          )
                        }
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {orderItems.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No items added
                    </td>
                  </tr>
                )}
              </tbody>

                  </table>

                  <div className="text-right font-semibold mt-4">
                    Total Amount: <span className="text-green-700">৳{totalAmount.toFixed(2)}</span>
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
