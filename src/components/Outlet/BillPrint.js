import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetTblSalesDataByIdQuery } from "../../features/tblSales/tblSales";
import './BillPrint.css';

const BillPrint = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetTblSalesDataByIdQuery(id);
  const [items, setItems] = useState([]);

  const printRef = useRef();

  useEffect(() => {
    if (data) {
      setItems(data.data);
    }
  }, [data]);

  useEffect(() => {
    // Auto-trigger print after short delay
    const timer = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  const total = items.reduce((acc, item) => acc + item.unitprice * item.quentity, 0);

  return (
    <div ref={printRef} className="bill-print-container p-6 w-[80mm] mx-auto text-xs font-mono">
      <div className="text-center mb-2">
        <h1 className="text-lg font-bold uppercase">Cafe TORR</h1>
        <p>123 Main Street, City</p>
        <p>Phone: 01234-567890</p>
      </div>

      <div className="border-t border-b py-1 text-[10px]">
        <p><strong>Bill No:</strong> {id}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
      </div>

      <table className="w-full mt-2 border-t border-b text-[11px]">
        <thead>
          <tr>
            <th className="text-left">#</th>
            <th className="text-left">Item</th>
            <th className="text-right">Qty</th>
            <th className="text-right">Price</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item.itemcode}>
              <td>{i + 1}</td>
              <td>{item.itemname}</td>
              <td className="text-right">{item.quentity}</td>
              <td className="text-right">{item.unitprice.toFixed(2)}</td>
              <td className="text-right">{item.totalprice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-2 text-[12px] font-semibold">
        Total Amount: {total.toFixed(2)} Tk
      </div>

      <div className="text-center mt-2 text-[10px] border-t pt-2">
        <p>Thank you for visiting Cafe TORR</p>
        <p>Visit Again!</p>
      </div>
    </div>
  );
};

export default BillPrint;
