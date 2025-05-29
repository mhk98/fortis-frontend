import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTblSalesDataByIdQuery } from "../../features/tblSales/tblSales";

const BillPreview = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetTblSalesDataByIdQuery(id);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data) {
      setItems(data.data);
    }
  }, [data]);

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  const totalAmount = items.reduce((acc, curr) => acc + curr.unitprice * curr.quentity, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-lg p-10 text-gray-800">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide text-blue-800">Cafe TORR</h1>
          <p className="text-base">123 Main Street, City, Country</p>
          <p className="text-sm text-gray-500">Phone: 01234-567890</p>
        </div>

        {/* Bill Metadata */}
        <div className="grid grid-cols-2 gap-4 border-t border-b py-4 mb-6 text-sm">
          <div><strong>Bill No:</strong> {id}</div>
          <div><strong>Date:</strong> {date}</div>
          <div><strong>Time:</strong> {time}</div>
          <div><strong>Cashier:</strong> Operator</div>
        </div>

        {/* Item Table */}
        <table className="w-full text-sm mb-6 border">
          <thead>
            <tr className="bg-gray-200 text-left border-b">
              <th className="py-2 px-2">#</th>
              <th className="py-2 px-2">Item</th>
              <th className="py-2 px-2">Qty</th>
              <th className="py-2 px-2 text-right">Price</th>
              <th className="py-2 px-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.itemcode} className="border-b">
                <td className="py-2 px-2">{idx + 1}</td>
                <td className="py-2 px-2">{item.itemname}</td>
                <td className="py-2 px-2">{item.quentity}</td>
                <td className="py-2 px-2 text-right">{item.unitprice.toFixed(2)}</td>
                <td className="py-2 px-2 text-right">{item.totalprice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Section */}
        <div className="text-right text-lg font-bold border-t pt-4">
          <p>Total Amount: <span className="text-green-700">{totalAmount.toFixed(2)} Tk</span></p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Thank you for visiting <span className="font-semibold text-blue-800">Cafe TORR</span></p>
          <p>We hope to see you again soon!</p>
        </div>
      </div>
    </div>
  );
};

export default BillPreview;
