import React, { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { useGetTblSalesDataByIdQuery, useUpdateTblSalesMutation } from "../../features/tblSales/tblSales";
import { Select } from "@windmill/react-ui";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const history = useHistory();
  const { kotNo, ResSL, ResName } = useParams();






  const waiterno = localStorage.getItem("Name")

  const { data, isLoading, isError, error } = useGetTblSalesDataByIdQuery(kotNo);
  const [items, setItems] = useState([]);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const [updateTblSales] = useUpdateTblSalesMutation();

  useEffect(() => {
    if (isError) {
      console.error("Error data fetching", error);
    } else if (!isLoading && data) {
      setItems(data.data);
    }
  }, [data, isLoading, isError, error]);

  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear());
  const formattedDate = `${day}-${month}-${year}`;

  const paymentMethods = [
    "Send To Cashier",
    "Credit Card",
    "M-Banking",
    "Bank",
    "Multi-Payment",
    "Complimentary",
    "Void",
  ];
  const creditCards = [
    "BRAC BANK LTD.",
    "CITY BANK LIMITED",
    "DUTCH BANGLA BANK LTD.",
    "EASTERN BANK LTD.",
    "MUTUAL TRUST BANK LTD.",
    "PUBALI BANK LIMITED",
    "UNITED COMMERCIAL BANK LTD.",
  ];
  const mBankingOptions = ["BKASH", "ROCKET", "NAGAD", "TRUST AXITA PAY", "UPAY"];
  const bankOptions = ["BANK CHEQUE", "BANK TRANSFER"];
  const complimentaryOptions = ["ANANTA GROUP", "ABUL KAHIR STEEL", "ACI"];

  const handleSubmitOrder = async () => {
    if (!items.length) {
      alert("No items to edit.");
      return;
    }

    try {
      const updatedPayload = {
        items,
        billprint: "Y",
      };

      const response = await updateTblSales({ data: updatedPayload }).unwrap();

      if (response.success) {
        toast.success("Order updated successfully!");
        history.push(`/app/bill-print/${kotNo}`);
      } else {
        toast.error("Failed to update order.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update order.");
    }
  };

  const handleSubmitPayMode = async () => {
    if (!items.length) {
      alert("No items to edit.");
      return;
    }

    try {
      const updatedPayload = {
        items,
        kotno: kotNo,
        Flug: 2,
        ResSL: ResSL,
        paymode: selectedMethod,
        Chargeto: selectedDetail,
        waiterno
      };

      const response = await updateTblSales({ data: updatedPayload }).unwrap();

      if (response.success) {
        toast.success("Paymode updated successfully!");
      } else {
        toast.error("Failed to update paymode.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update paymode.");
    }
  };

  return (
    <div>
      {/* Top Navigation */}
      <div className="bg-gray-200 px-2 py-3 my-2">
        <nav className="flex justify-between items-center text-gray-500 text-sm space-x-2">
          <div className="flex items-center space-x-2">
            <IoHome className="w-4 h-4" />
            <span>Dashboard {ResName}</span>
          </div>
          <div>
            <span>Current Date: {formattedDate}</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="border rounded shadow bg-white text-sm mt-6">
        <div className="bg-blue-700 text-white px-4 py-2 font-semibold rounded-t">
          Order Details
        </div>

        <div className="p-4 space-y-4">
          {/* Item Details Table */}
          <div>
            <div className="font-semibold text-lg mb-2">Item Details</div>
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
                      {item.kotStatus === "No" ? (
                        <span className="px-2 py-1 rounded text-white text-xs bg-teal-500">
                          Complete
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-white text-xs bg-yellow-500">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-evenly flex-wrap gap-2">
            <button className="bg-red-500 text-white px-6 py-2 rounded">KOT Print</button>
            <Link to={`/app/edit-order/${kotNo}`} className="bg-blue-500 text-white px-6 py-2 rounded text-center">Edit</Link>
            <Link to={`/app/bill-preview/${kotNo}`} className="bg-green-400 text-white px-6 py-2 rounded text-center">Bill Preview</Link>
            <button onClick={handleSubmitOrder} className="bg-yellow-500 text-white px-6 py-2 rounded">Bill Print</button>
            <button
              onClick={() => {
                setShowOptions(!showOptions);
                setSelectedMethod(null);
                setSelectedDetail(null);
              }}
              className="bg-teal-500 text-white px-6 py-2 rounded"
            >
              Pay Mode
            </button>
          </div>

          {showOptions && (
  <div className="mt-4 flex flex-col items-end space-y-4">
    {/* Pay Mode Options */}
    <div className="flex flex-col md:flex-row gap-6">
      {/* Spacer to push right on large screens */}
      <div className="hidden md:block flex-1"></div>

      {/* Method List */}
      <div className="bg-gray-100 p-4 rounded shadow w-48">
        {paymentMethods.map((method) => (
          <button
            key={method}
            onClick={() => {
              setSelectedMethod(method);
              setSelectedDetail(null);
            }}
            className={`block w-full text-left px-3 py-1 rounded hover:bg-gray-200 ${
              selectedMethod === method ? "bg-gray-300" : ""
            }`}
          >
            {method}
          </button>
        ))}
      </div>

      {/* Conditional Select Dropdown */}
      {(selectedMethod === "Credit Card" ||
        selectedMethod === "M-Banking" ||
        selectedMethod === "Bank" ||
        selectedMethod === "Complimentary") && (
        <div className="w-full md:w-64">
          <Select
            className="mt-1"
            onChange={(e) => setSelectedDetail(e.target.value)}
          >
            <option value="">Select Option</option>
            {(selectedMethod === "Credit Card"
              ? creditCards
              : selectedMethod === "M-Banking"
              ? mBankingOptions
              : selectedMethod === "Bank"
              ? bankOptions
              : complimentaryOptions
            ).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
      )}
    </div>

    {/* Submit Button Aligned Right */}
    <div>
      <button
        onClick={handleSubmitPayMode}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        ✅ Submit
      </button>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
