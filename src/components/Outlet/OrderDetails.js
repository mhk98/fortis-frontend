import React, { useEffect, useState } from "react";
import { IoHome } from 'react-icons/io5';
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { useGetTblSalesDataByIdQuery, useUpdateTblSalesMutation } from "../../features/tblSales/tblSales";
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import toast from "react-hot-toast";

const OrderDetails = () => {
 const history = useHistory()

  const {id} = useParams()


  const {data, isLoading, isError, error} = useGetTblSalesDataByIdQuery(id)

  const [items, setItems] = useState([]);


  useEffect(() => {
    if (isError) {
      console.log("Error data fetching", error);
    } else if (!isLoading && data) {
      setItems(data.data)
  
    }
  }, [data, isLoading, isError, error]);
  
console.log("items", items)


  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');        // 18
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 05 (months are 0-based)
  const year = String(now.getFullYear());          // 25 (last two digits)
  
  const formattedDate = `${day}-${month}-${year}`;


  const [showOptions, setShowOptions] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = ['Send To Cash', 'Credit Card', 'M-Banking', 'Bank', 'Multi-Payment', 'Complimentary', 'Void' ];

  const creditCards = ['BRAC BANK LTD.', 'CITY BANK LIMITED', 'DUTCH BANGLA BANK LTD.', 
    'EASTERN BANK LTD.', 'MUTUAL TRUST BANK LTD.', 'PUBALI BANK LIMITED', 'UNITED COMMERCIAL BANK LTD.'
  ];

  const mBankingOptions = ['BKASH', 'ROCKET', 'NAGAD', 'TRUST AXITA PAY', 'UPAY'];
  const bankOptions = ['BANK CHEQUE', 'BANK TRANSFER'];
  const complimentaryOptions = ['ANANTA GROUP', 'ABUL KAHIR STEEL', 'ACI'];


  const [updateTblSales] = useUpdateTblSalesMutation();
  
  const handleSubmitOrder = async () => {
    if (!items.length) {
      alert("No items to edit.");
      return;
    }
  
    try {
      const updatedPayload = items.map((item) => ({
        itemcode: item.itemcode,
        billprint: "Y",
   
      }));

      console.log("updatePayload", updatedPayload)
  
      const response = await updateTblSales({ data: updatedPayload }).unwrap();
  
      if (response.success) {
        toast.success("Order updated successfully!");
        history.push(`/app/bill-print/${id}`)

      } else {
        toast.error("Failed to update order.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update order.");
    }
  };


  return (

    <div>
        <div className="bg-gray-200 px-2 py-3 my-2">
        <nav className="flex justify-between items-center text-gray-500 text-sm space-x-2">
          <div className='flex justify-between items-center space-x-2'>
          <IoHome className="w-4 h-4" />
          <span>Dashboard Café TORR </span>
          </div>
          <div>
          <span>Current Date {formattedDate}</span>
          </div>
          <div>
          </div>
        </nav>
      </div>
      <div className="border rounded shadow bg-white text-sm mt-6">
      <div className="bg-blue-700 text-white px-4 py-2 font-semibold rounded-t">Order details</div>
      <div className="p-4 space-y-4">
       {/* {
        items.map((order) => (
          <div className="grid grid-cols-3 gap-4">
          <div><span className="font-semibold">Bill No :</span> {order.billNo}</div>
          <div><span className="font-semibold">Table No. :</span> {order.tableNo}</div>
          <div><span className="font-semibold">Room No. :</span> {order.roomNo}</div>

          <div><span className="font-semibold">Terminal :</span> {order.terminal}</div>
          <div><span className="font-semibold">Serve Time :</span> {order.serveTime}</div>
          <div><span className="font-semibold">PAX :</span> {order.pax}</div>

          <div><span className="font-semibold">Waiter Name :</span> {order.waiterName}</div>
          <div><span className="font-semibold">Gust Name :</span> {order.guestName}</div>

          <div><span className="font-semibold">Company Name :</span> {order.companyName}</div>
          <div><span className="font-semibold">E-mail :</span> {order.email}</div>
          <div><span className="font-semibold">Contact No. :</span> {order.contactNo}</div>
        </div>
        ))
       } */}

        <div>
          <div className="font-semibold text-lg mb-2">Item details</div>
          <table className="table-auto w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Price(s)</th>
                <th className="border px-2 py-1">Qty</th>
                <th className="border px-2 py-1">Kitchen</th>
                <th className="border px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id}>
                  <td className="border px-2 py-1">{idx + 1}</td>
                  <td className="border px-2 py-1">{item.itemcode}</td>
                  <td className="border px-2 py-1">{item.itemname}</td>
                  <td className="border px-2 py-1">{item.unitprice}</td>
                  <td className="border px-2 py-1">{item.quentity}</td>
                  <td className="border px-2 py-1">{item.kitchen}</td>

                  <td className="border px-2 py-1">
                  {
                    item.kotStatus === "No" ? (
                  <span className="px-2 py-1 rounded text-white text-xs bg-teal-500">Complete</span>
                      
                    ): (

                  <span className="px-2 py-1 rounded text-white text-xs bg-yellow-500">Pending</span>


                    )
                  }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
 
      <div className="flex justify-evenly flex-wrap">
    <button className="bg-red-500 text-white px-6 py-2 rounded">KOT Print</button>
    <button className="bg-blue-500 text-white px-6 py-2 rounded"><Link to={`/app/edit-order/${id}`}>Edit</Link></button>
    <button className="bg-green-400 text-white px-6 py-2 rounded"><Link to={`/app/bill-preview/${id}`}>Bill Preview</Link></button>
    <button  onClick={handleSubmitOrder} className="bg-yellow-500 text-white px-6 py-2 rounded">Bill Print</button>
    <button
      className="bg-teal-500 text-white px-6 py-2 rounded"
      onClick={() => {
        setShowOptions(!showOptions);
        setSelectedMethod(null); // Reset selection on toggle
      }}
    >
      Pay Mode
    </button>
  </div>
   

  {/* Panel below buttons */}
  {showOptions && (
    <div className="mt-2 flex gap-6 justify-end">
      {/* Payment Methods */}
      <div className="bg-gray-100 p-4 rounded shadow w-48">
        {/* <h3 className="font-semibold mb-2">Pay Mode</h3> */}
        {paymentMethods.map((method) => (
          <button
            key={method}
            className={`block w-full text-left px-3 py-1 rounded hover:bg-gray-200 ${
              selectedMethod === method ? 'bg-gray-300' : ''
            }`}
            onClick={() => setSelectedMethod(method)}
          >
            {method}
          </button>
        ))}
      </div>

      {/* Credit Card Options */}
      {selectedMethod === 'Credit Card' && (
        <div className="mt-4">   
           <Select name="assignedTo" className="mt-1">

            {creditCards.map((card) => (
            <option key={card} value={card}>
              {card}
              </option>
               ))}
               </Select>
              {/* {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo.message}</p>} */}
            </div>
      )}

{/* M-Banking Option */}

{selectedMethod === 'M-Banking' && (
  <div className="mt-4">
    <Select name="mBankingOption" className="mt-1">
      {mBankingOptions.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </Select>
  </div>
)}

{selectedMethod === 'Bank' && (
  <div className="mt-4">
    <Select name="bankOptions" className="mt-1">
      {bankOptions.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </Select>
  </div>
)}

{selectedMethod === 'Complimentary' && (
  <div className="mt-4">
    <Select name="bankOptions" className="mt-1">
      {complimentaryOptions.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </Select>
  </div>
)}

    </div>
  )}
</div>

      </div>
    </div>
    </div>
    
  );
};

export default OrderDetails;
