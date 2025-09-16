import React from "react";
import { useSelector } from "react-redux";
import "./orders.css";

function OrderHistory() {
  const orders = useSelector((state) => state.orders);

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Order History</h2>

      {orders.length === 0 ? (
        <p className="empty-orders">No orders placed yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-details-box">
              <p><strong>Order ID:</strong> {order.order_id}</p>
              <p><strong>Date:</strong> {order.date || "Not recorded"}</p>

              <p><strong>Items:</strong></p>
              {order.orders.map((item, itemIndex) => (
                <div key={itemIndex} className="order-item-line">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="order-item-img"
                  />
                  <span>{item.name} × {item.units}</span>
                </div>
              ))}

              <p><strong>Total Paid:</strong> ₹{order.cost.total}</p>
              <p><strong>Shipping:</strong> ₹{order.cost.shipping}</p>
              <p><strong>Tax:</strong> ₹{order.cost.tax}</p>
              <p><strong>Coupon Discount:</strong> ₹{order.cost.coupon}</p>
              <p><strong>Direct Discount:</strong> ₹{order.cost.discount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;