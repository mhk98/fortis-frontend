import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useCreateTblSalesMutation, useGetPreviousKotQuery } from '../../features/tblSales/tblSales';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

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
  const [meal, setMeal] = useState("")
  const [contact, setContact] = useState("")
  const [table, setTable] = useState("")
  const [room, setRoom] = useState("")
  const [guest, setGuest] = useState("")
  const [outlet, setOutlet] = useState("")
  const waiterno = localStorage.getItem("Name")
  const {kotNo:kotNo1, ResSL, ResName, } = useParams()
  // const res = { name: ResName };

  console.log("res", ResName)
  const history = useHistory()


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


  // const [billNo, setBillNo] = useState(0)
  // useEffect(() => {
  //   const fetchBill = async () => {
  //     setIsLoading(true);
  //     setIsError(false);
  
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/v1/tblSales/kot');
  //       const data = response.data;
  //       const newBillNo = parseInt(data?.data || 0) + 1;
  //       // setBillNo(data?.data);
  //       setKotNo(newBillNo); // <-- Automatically set kotNo here
  //     } catch (err) {
  //       console.error('Error fetching items:', err);
  //       setIsError(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  
  //   fetchBill();
  // }, []);
  

  const {data:data1, isLoading:isLoading1, isError:isError1, error:error1, refetch} = useGetPreviousKotQuery()

  const [kotNo, setKotNo] = useState(0);



  useEffect(() => {
    if (isError1) {
      console.log("Error data fetching", error1);
    } else if (!isLoading1 && data1) {
      const newBillNo = parseInt(data1?.data || 0) + 1;
      setKotNo(newBillNo); // Set it from server just once
    }
  }, [data1, isLoading1, isError1]);
  
  
  
console.log("kotNo", kotNo)


  const [createTblSales] = useCreateTblSalesMutation()
  
  const handleSubmitOrder = async () => {
    const data = {
      orderItems,
      meal,
      pax,
      contact,
      table,
      room,
      guest,
      outlet,
      waiterno,
      kotno:kotNo,
      ResSL:ResSL,
    }
    
    if (!orderItems.length) return alert("No items in order.");
    try {
      const res = await createTblSales(data).unwrap(); // unwrap gives direct access to the response or throws on error
      console.log("Order saved:", res.success);

      if(res.success === true){
        alert("Order placed successfully!");
        setOrderItems([]); // Clear the cart
        history.push(`/app/order-details/${kotNo}/${ResSL}/${ResName}`)
        
      }
    
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order.");
    }
  };
    
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const fields = ["tableNo", "roomNo", "meal", "pax", "guest", "outlet", "contact"];
  
      if (Array.isArray(fields)) {
        const currentIndex = fields.indexOf(e.target.name);
        if (currentIndex >= 0 && currentIndex < fields.length - 1) {
          const nextField = fields[currentIndex + 1];
          document.getElementsByName(nextField)[0]?.focus();
        }
      }
    }
  };
  
  

  return (
    <div className="border rounded-md shadow-md">
      <div className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-semibold">🎁 New Order</span>
        {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
      </div>

      {isOpen && (
        <div>
          <div className="p-4 bg-white">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Table Number */}
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">Bill No</label>
    <input
  type="text"
  name="kotNo"
  onKeyDown={handleEnter}
  value={kotNo}
  readOnly
  placeholder="Bill Number"
  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
/>


  </div>

  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">Table No</label>
    <input
      type="text"
      name='tableNo'
      onKeyDown={handleEnter}
      onChange={(e) => setTable(e.target.value)}
      placeholder="Table Number"
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Room Number */}
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">Room No</label>
    <input
      type="text"
      name='roomNo'
      onKeyDown={handleEnter}
      onChange={(e) => setRoom(e.target.value)}
      placeholder="Room Number"
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Serve Time */}
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">Serve Time</label>
    <select
      name='meal'
      onKeyDown={handleEnter}
      onChange={(e) => setMeal(e.target.value)}
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Select</option>
      <option>BREAKFAST</option>
      <option>LUNCH</option>
      <option>DINNER</option>
    </select>
  </div>

  {/* PAX */}
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">PAX</label>
    <input
      type="number"
      name='pax'
      onKeyDown={handleEnter}
      value={pax}
      onChange={(e) => {
        const value = e.target.value;
        setPax(value);
        if (value) {
          setIsOpen1(true);
          setIsOpen2(true);
        }
      }}
      placeholder="Number of Guests"
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Guest Name */}
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">Guest Name</label>
    <input
      type="text"
      name='guest'
      onKeyDown={handleEnter}
      onChange={(e) => setGuest(e.target.value)}
      placeholder="Guest Name"
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Terminal / Outlet */}
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">Terminal</label>
    <select
      name='outlet'
      onKeyDown={handleEnter}
      onChange={(e) => setOutlet(e.target.value)}
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Select</option>
      <option>COFFEE SHOP</option>
      <option>RESTAURANT</option>
    </select>
  </div>

  {/* Contact */}
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">Contact</label>
    <input
      type="text"
      name='contact'
      onKeyDown={handleEnter}
      onChange={(e) => setContact(e.target.value)}
      placeholder="Contact Number"
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
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
                  <button
                      onClick={handleSubmitOrder}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4"
                    >
                      ✅ Submit KOT
                    </button>

                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
