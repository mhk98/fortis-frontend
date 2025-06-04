// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom/cjs/react-router-dom";
// import {
//   useGetTblSalesDataByIdQuery,
//   useUpdateTblSalesMutation,
// } from "../../features/tblSales/tblSales";
// import { IoHome } from "react-icons/io5";
// import toast from "react-hot-toast";

// const EditOrder = () => {
//   const { id } = useParams();
//   const { data, isLoading, isError, error } = useGetTblSalesDataByIdQuery(id);
//   const [updateTblSales] = useUpdateTblSalesMutation();

//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     if (isError) {
//       console.log("Error fetching data", error);
//     } else if (!isLoading && data) {
//       const updatedItems = data.data.map((item) => ({
//         ...item,
//         quantity: item.quentity ?? 1,
//         total: item.unitprice * (item.quentity ?? 1),
//       }));
//       setItems(updatedItems);
//     }
//   }, [data, isLoading, isError, error]);

//   const handleQuantityChange = (index, delta) => {
//     setItems((prevItems) =>
//       prevItems.map((item, i) => {
//         if (i === index) {
//           const newQty = item.quantity + delta;

//           if (delta < 0 && item.billprint === "Y") {
//             alert("Cannot reduce quantity. Bill already printed.");
//             return item;
//           }

//           if (newQty < 1) return item;

//           return {
//             ...item,
//             quantity: newQty,
//             total: item.unitprice * newQty,
//           };
//         }
//         return item;
//       })
//     );
//   };

//   const now = new Date();
//   const formattedDate = now.toLocaleDateString("en-GB").split("/").join("-"); // dd-mm-yyyy

//   const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  
//   const handleSubmitOrder = async () => {
//     if (!items.length) {
//       alert("No items to edit.");
//       return;
//     }
  
//     try {
//       // const updatedPayload = items.map((item) => ({
//       //   itemcode: item.itemcode,
//       //   totalprice: item.total,
//       //   quentity: item.quantity,
//       // }));

//       const updatedPayload = {
//         items
//       }

//       console.log("updatePayload", updatedPayload)
  
//       const response = await updateTblSales({ data: updatedPayload }).unwrap();
  
//       if (response.success) {
//         toast.success("Order updated successfully!");
//       } else {
//         toast.error("Failed to update order.");
//       }
//     } catch (err) {
//       console.error("Update failed:", err);
//       toast.error("Failed to update order.");
//     }
//   };
  

//   return (
//     <>
//       <div className="bg-gray-200 px-2 py-3 my-2">
//         <nav className="flex justify-between items-center text-gray-500 text-sm space-x-2">
//           <div className="flex items-center space-x-2">
//             <IoHome className="w-4 h-4" />
//             <span>Dashboard Café TORR</span>
//           </div>
//           <div>
//             <span>Current Date {formattedDate}</span>
//           </div>
//         </nav>
//       </div>

//       <div className="border rounded shadow bg-white text-sm mt-6">
//         <div className="bg-blue-700 text-white px-4 py-2 font-semibold rounded-t">
//           Order Details
//         </div>
//         <div className="p-4 space-y-4">
//           <div>
//             <div className="font-semibold text-lg mb-2">Order Items</div>
//             <table className="table-auto w-full text-left border">
//               <thead className="bg-gray-100">
//                 <tr>
               
//                   <th className="border px-2 py-1">Itemcode</th>
//                   <th className="border px-2 py-1">Name</th>
//                   <th className="border px-2 py-1">Total</th>
//                   <th className="border px-2 py-1">Qty</th>
//                   <th className="border px-2 py-1">Kitchen</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item, idx) => (
//                   <tr key={`${item.itemcode}-${idx}`}>
//                     <td className="border px-2 py-1">{item.itemcode}</td>
//                     <td className="border px-2 py-1">{item.itemname}</td>
//                     <td className="border px-2 py-1">{item.total.toFixed(2)}</td>
//                     <td className="border px-2 py-1">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleQuantityChange(idx, -1)}
//                           className={`px-2 rounded ${
//                             item.billprint === "Y"
//                               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                               : "bg-gray-300 hover:bg-gray-400"
//                           }`}
//                         >
//                           -
//                         </button>
//                         <span>{item.quantity}</span>
//                         <button
//                           onClick={() => handleQuantityChange(idx, 1)}
//                           className="bg-gray-300 px-2 rounded hover:bg-gray-400"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td className="border px-2 py-1">{item.kitchen}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full mt-4">
//               <button
//                 onClick={handleSubmitOrder}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full md:w-auto"
//               >
//                 ✅ Save
//               </button>
//               <div className="font-semibold">
//                 Grand Total:{" "}
//                 <span className="text-blue-600">{grandTotal.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditOrder;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import {
  useGetTblSalesDataByIdQuery,
  useUpdateTblSalesMutation,
} from "../../features/tblSales/tblSales";
import { IoHome } from "react-icons/io5";
import toast from "react-hot-toast";

const EditOrder = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetTblSalesDataByIdQuery(id);
  const [updateTblSales] = useUpdateTblSalesMutation();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (isError) {
      console.log("Error fetching data", error);
    } else if (!isLoading && data) {
      const updatedItems = data.data.map((item) => ({
        ...item,
        quantity: item.quentity ?? 1,
        total: item.unitprice * (item.quentity ?? 1),
      }));
      setItems(updatedItems);
    }
  }, [data, isLoading, isError, error]);

  const handleQuantityChange = (index, delta) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          const newQty = item.quantity + delta;

          if (delta < 0 && item.billprint === "Y") {
            alert("Cannot reduce quantity. Bill already printed.");
            return item;
          }

          if (newQty < 1) return item;

          return {
            ...item,
            quantity: newQty,
            total: item.unitprice * newQty,
          };
        }
        return item;
      })
    );
  };

  const handleSubmitOrder = async () => {
    if (!items.length) {
      alert("No items to edit.");
      return;
    }

    try {
      const updatedPayload = {
        kotNo: id,
        items: items.map((item) => ({
          itemcode: item.itemcode,
          quentity: item.quantity,
          totalprice: item.total,
        })),
      };

      console.log("Submitting updated payload:", updatedPayload);

      const response = await updateTblSales({data:updatedPayload}).unwrap();

      if (response.success) {
        toast.success("Order updated successfully!");
      } else {
        toast.error("Failed to update order.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update order.");
    }
  };

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-GB").split("/").join("-");

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <>
      <div className="bg-gray-200 px-2 py-3 my-2">
        <nav className="flex justify-between items-center text-gray-500 text-sm space-x-2">
          <div className="flex items-center space-x-2">
            <IoHome className="w-4 h-4" />
            <span>Dashboard Café TORR</span>
          </div>
          <div>
            <span>Current Date {formattedDate}</span>
          </div>
        </nav>
      </div>

      <div className="border rounded shadow bg-white text-sm mt-6">
        <div className="bg-blue-700 text-white px-4 py-2 font-semibold rounded-t">
          Order Details
        </div>
        <div className="p-4 space-y-4">
          <div>
            <div className="font-semibold text-lg mb-2">Order Items</div>
            <table className="table-auto w-full text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Itemcode</th>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Total</th>
                  <th className="border px-2 py-1">Qty</th>
                  <th className="border px-2 py-1">Kitchen</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={`${item.itemcode}-${idx}`}>
                    <td className="border px-2 py-1">{item.itemcode}</td>
                    <td className="border px-2 py-1">{item.itemname}</td>
                    <td className="border px-2 py-1">{item.total.toFixed(2)}</td>
                    <td className="border px-2 py-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(idx, -1)}
                          className={`px-2 rounded ${
                            item.billprint === "Y"
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                          disabled={item.billprint === "Y"}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(idx, 1)}
                          className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="border px-2 py-1">{item.kitchen}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full mt-4">
              <button
                onClick={handleSubmitOrder}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full md:w-auto"
              >
                ✅ Save
              </button>
              <div className="font-semibold">
                Grand Total:{" "}
                <span className="text-blue-600">{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrder;
