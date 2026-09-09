import { useState } from "react";
import { useCart } from "../context/CartContext";
import { sendOrderViaWhatsApp } from "../data/whatsappOrder";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const {
    items,
    total,
    itemCount,
    addItem,
    decrementItem,
    removeItem,
    clearCart,
    isDrawerOpen,
    closeDrawer,
  } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    orderType: "Pickup", // "Pickup" | "Delivery"
    houseNo: "",
    street: "",
    landmark: "",
    pincode: "",
    preferredTime: "ASAP",
    paymentMethod: "COD",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isDrawerOpen) return null;

  const isDelivery = customer.orderType === "Delivery";

  const canSubmit =
    itemCount > 0 &&
    customer.name.trim() &&
    customer.phone.trim() &&
    (!isDelivery || (customer.street.trim() && customer.pincode.trim()));

  function handleChange(e) {
    setCustomer((c) => ({ ...c, [e.target.name]: e.target.value }));
  }

  function handlePlaceOrder() {
    if (!canSubmit) return;
    sendOrderViaWhatsApp(items, customer, total);
    setSubmitted(true);
    clearCart();
  }

  return (
    <div className={styles.overlay} onClick={closeDrawer}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Your Order</h3>
          <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Close">
            ✕
          </button>
        </div>

        {submitted ? (
          <div className={styles.confirmation}>
            <p>✅ Your order was opened in WhatsApp — just hit send there to confirm.</p>
            <button className={styles.secondaryBtn} onClick={closeDrawer}>
              Continue Browsing
            </button>
          </div>
        ) : (
          <>
            <div className={styles.itemList}>
              {items.length === 0 && (
                <p className={styles.empty}>No items yet — add something from the menu.</p>
              )}
              {items.map((item) => (
                <div key={item.id} className={styles.itemRow}>
                  {item.image && (
                    <img className={styles.itemPhoto} src={item.image} alt={item.nameEn} />
                  )}
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.nameEn}</span>
                    <span className={styles.itemPrice}>₹{item.price} each</span>
                  </div>
                  <div className={styles.qtyControls}>
                    <button onClick={() => decrementItem(item.id)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => addItem(item)}>+</button>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.nameEn}`}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <>
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                {/* Order type toggle */}
                <div className={styles.toggleRow}>
                  {["Pickup", "Delivery"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`${styles.toggleBtn} ${
                        customer.orderType === type ? styles.toggleActive : ""
                      }`}
                      onClick={() => setCustomer((c) => ({ ...c, orderType: type }))}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className={styles.form}>
                  <input
                    name="name"
                    placeholder="Your name"
                    value={customer.name}
                    onChange={handleChange}
                  />
                  <input
                    name="phone"
                    placeholder="Phone number"
                    value={customer.phone}
                    onChange={handleChange}
                  />

                  {isDelivery && (
                    <>
                      <input
                        name="houseNo"
                        placeholder="House / Flat No."
                        value={customer.houseNo}
                        onChange={handleChange}
                      />
                      <input
                        name="street"
                        placeholder="Street / Area"
                        value={customer.street}
                        onChange={handleChange}
                      />
                      <input
                        name="landmark"
                        placeholder="Landmark (optional)"
                        value={customer.landmark}
                        onChange={handleChange}
                      />
                      <input
                        name="pincode"
                        placeholder="Pincode"
                        inputMode="numeric"
                        value={customer.pincode}
                        onChange={handleChange}
                      />
                    </>
                  )}

                  <select
                    name="preferredTime"
                    value={customer.preferredTime}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="ASAP">As soon as possible</option>
                    <option value="30 min">In 30 minutes</option>
                    <option value="1 hour">In 1 hour</option>
                    <option value="Evening">This evening</option>
                  </select>

                  <select
                    name="paymentMethod"
                    value={customer.paymentMethod}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="COD">Cash on {isDelivery ? "Delivery" : "Pickup"}</option>
                    <option value="UPI">UPI</option>
                    <option value="Pay at counter">Pay at Counter</option>
                  </select>

                  <textarea
                    name="note"
                    placeholder="Special instructions (optional)"
                    value={customer.note}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>

                <button
                  className={styles.primaryBtn}
                  disabled={!canSubmit}
                  onClick={handlePlaceOrder}
                >
                  Place Order via WhatsApp
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}