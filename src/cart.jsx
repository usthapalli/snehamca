import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  addOrder,
} from "./store";
import {
  calculateCartTotals,
  getCouponDiscount,
  calculateDiscount,
} from "./discountUtil";
import Confetti from "react-confetti";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";  // ✅ added
import "./app.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();  // ✅ added

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || item.Quantity || 1),
    0
  );

  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes for QR payment

  const taxPercent = 3;
  const shipping = 5;

  const { discount: directDiscount } = calculateDiscount(
    totalAmount,
    discountPercent
  );

  const couponDiscount = couponResult ? couponResult.discountAmount : 0;
  const totalDiscount =
    couponDiscount + (isDiscountApplied ? directDiscount : 0);
  const finalAmount = totalAmount - totalDiscount;
  const taxAmount = (finalAmount * taxPercent) / 100;
  const finalPayable = finalAmount + taxAmount + shipping;

  const orderID = "ORDER" + Math.floor(Math.random() * 10000);

  const templateParams = {
    order_id: orderID,
    date: new Date().toLocaleString(),
    orders: cartItems.map((item) => {
      const quantity = item.quantity || item.Quantity || 1;
      return {
        name: item.name,
        price: (item.price * quantity).toFixed(2),
        units: quantity,
        image_url: item.imageurl,
      };
    }),
    cost: {
      shipping: shipping,
      tax: taxAmount.toFixed(2),
      totalprice: totalAmount.toFixed(2),
      coupon: couponDiscount.toFixed(2),
      discount: isDiscountApplied ? directDiscount.toFixed(2) : "0.00",
      total: finalPayable.toFixed(2),
    },
    email: customerEmail,
  };

  const handleApplyCoupon = () => {
    const result = getCouponDiscount(couponCode, totalAmount);
    if (result.isValid) {
      setCouponResult(result);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } else {
      setCouponResult(null);
    }
  };

  const resetCoupon = () => {
    setCouponCode("");
    setCouponResult(null);
  };

  const applyDiscount = (percent) => {
    setDiscountPercent(percent);
    setIsDiscountApplied(true);
  };

  const resetDiscount = () => {
    setDiscountPercent(0);
    setIsDiscountApplied(false);
  };

  useEffect(() => {
    if (couponResult) {
      const result = getCouponDiscount(couponCode, totalAmount);
      setCouponResult(result.isValid ? result : null);
    }
  }, [totalAmount]);

  // Timer for QR code
  useEffect(() => {
    let timer;
    if (showQRCode && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showQRCode, timeLeft]);

  const handleSendEmail = () => {
    if (!customerEmail) {
      alert("Please enter your email address.");
      return;
    }

    emailjs
      .send(
        "service_dn4rh6k",
        "template_bk3z8qi",
        templateParams,
        "E-RgH9tENkXx5XB4l"
      )
      .then(() => {
        alert("✅ Email sent successfully!");
      })
      .catch((error) => {
        alert("❌ Email sending failed: " + error);
      });
  };

  const handleCompletePurchase = () => {
    dispatch(addOrder({ ...templateParams, paymentMethod: "QR Payment" }));
    dispatch(clearCart());
    setCustomerEmail("");
    setCouponCode("");
    setCouponResult(null);
    setDiscountPercent(0);
    setIsDiscountApplied(false);
    setShowQRCode(false);
    setTimeLeft(120);

    Swal.fire({
      title: "Purchase Completed!",
      text: "🛍 Your order has been placed successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      // ✅ redirect to signup page
      navigate("/signup");
    });
  };

  const handleCashOnDelivery = () => {
    dispatch(addOrder({ ...templateParams, paymentMethod: "Cash on Delivery" }));
    dispatch(clearCart());
    setCustomerEmail("");
    setCouponCode("");
    setCouponResult(null);
    setDiscountPercent(0);
    setIsDiscountApplied(false);

    Swal.fire({
      title: "Order Placed!",
      text: "📦 Your order has been placed with Cash on Delivery.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/signup");  // ✅ also redirect to signup here
    });
  };

  return (
    <div className="cart-page">
      {showConfetti && <Confetti />}

      <div className="cart-container">
        {/* LEFT: Cart Items */}
        <div className="cart-items-panel">
          <h2>🛒 Cart Items</h2>
          {cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.imageurl}
                  alt={item.name}
                  className="item-image"
                />
                <div>
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity || item.Quantity || 1}</p>
                  <p>
                    Total: ₹
                    {(
                      item.price * (item.quantity || item.Quantity || 1)
                    ).toFixed(2)}
                  </p>
                  <div>
                    <button
                      className="cart-btn blue"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </button>
                    <button
                      className="cart-btn blue"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      -
                    </button>
                    <button
                      className="cart-btn gray"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: Order Summary */}
        <div className="order-summary-panel">
          <h2>📄 Order Summary</h2>
          <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>

          <h4>Apply Coupon</h4>
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="coupon-input"
          />
          {couponResult ? (
            <p>
              🎉 Coupon "{couponCode}" Applied! {couponResult.discountPercent}% Off
              <br />
              Discount: ₹{couponDiscount.toFixed(2)}
            </p>
          ) : (
            couponCode && <p style={{ color: "red" }}>❌ Invalid Coupon</p>
          )}
          <button className="cart-btn blue" onClick={handleApplyCoupon}>
            Apply Coupon
          </button>
          <button className="cart-btn gray" onClick={resetCoupon}>
            Reset Coupon
          </button>

          <hr />

          <h4>Apply Direct Discount</h4>
          {isDiscountApplied && (
            <p>
              🎉 Direct Discount {discountPercent}% Applied: ₹
              {directDiscount.toFixed(2)}
            </p>
          )}
          <div style={{ marginTop: "10px" }}>
            <button
              className="cart-btn blue"
              onClick={() => applyDiscount(10)}
            >
              Apply 10% Discount
            </button>
            <button
              className="cart-btn blue"
              onClick={() => applyDiscount(20)}
            >
              Apply 20% Discount
            </button>
            <button
              className="cart-btn blue"
              onClick={() => applyDiscount(30)}
            >
              Apply 30% Discount
            </button>
            <button className="cart-btn gray" onClick={resetDiscount}>
              Reset Discount
            </button>
          </div>

          <hr />

          <h3>💰 Final Amount Before Tax: ₹{finalAmount.toFixed(2)}</h3>
          <p>📊 Tax ({taxPercent}%): ₹{taxAmount.toFixed(2)}</p>
          <p>🚚 Shipping: ₹{shipping}</p>
          <h2>✅ Total Payable: ₹{finalPayable.toFixed(2)}</h2>

          <hr />

          <h4>📲 Scan & Pay</h4>
          <button
            className="cart-btn blue"
            onClick={() => {
              setShowQRCode(!showQRCode);
              setTimeLeft(120);
            }}
          >
            {showQRCode ? "Hide QR Code" : "Show QR Code"}
          </button>

          {showQRCode && (
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <QRCodeCanvas
                value={`upi://pay?pa=9390583696@axl&pn=sneha store&am=${finalPayable.toFixed(
                  2
                )}&cu=INR&tn=Order%20Payment`}
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
              />
              <p style={{ marginTop: "10px", fontWeight: "bold", color: "red" }}>
                ⏳ Time left: {timeLeft}s
              </p>
            </div>
          )}

          <hr />

          <label>📧 Enter your Gmail to receive order confirmation</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="you@example.com"
            className="coupon-input"
          />
          <button className="cart-btn green" onClick={handleSendEmail}>
            ✅ Send Email Only
          </button>

          <button className="cart-btn orange" onClick={handleCompletePurchase}>
            🛍 Complete Purchase
          </button>

          <button className="cart-btn purple" onClick={handleCashOnDelivery}>
            💵 Cash on Delivery
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
