// Replace with the café's actual WhatsApp number, country code first, no + or spaces.
// e.g. India number 98765 43210 -> "919876543210"
export const CAFE_WHATSAPP_NUMBER = "918766436683";

/**
 * Builds a formatted order message and opens WhatsApp (web or app)
 * with the message pre-filled, ready for the customer to hit send.
 *
 * items: [{ nameEn, qty, price }]
 * customer: {
 *   name, phone,
 *   orderType,       // "Pickup" | "Delivery"
 *   houseNo, street, landmark, pincode,  // only used when orderType === "Delivery"
 *   preferredTime,    // "ASAP" | "30 min" | "1 hour" | custom string
 *   paymentMethod,    // "COD" | "UPI" | "Pay at counter"
 *   note,
 * }
 */
export function sendOrderViaWhatsApp(items, customer, total) {
  const isDelivery = customer.orderType === "Delivery";

  const addressLine = [customer.houseNo, customer.street, customer.landmark]
    .filter(Boolean)
    .join(", ");

  const lines = [
    "🛒 *New Vatika Café — Order*",
    "",
    ...items.map(
      (i) => `• ${i.nameEn} x${i.qty} — ₹${i.price * i.qty}`
    ),
    "",
    `*Total: ₹${total}*`,
    "",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Order Type: ${customer.orderType || "Pickup"}`,
    isDelivery && addressLine ? `Address: ${addressLine}` : null,
    isDelivery && customer.pincode ? `Pincode: ${customer.pincode}` : null,
    `Preferred Time: ${customer.preferredTime || "ASAP"}`,
    `Payment: ${customer.paymentMethod || "COD"}`,
    customer.note ? `Note: ${customer.note}` : null,
  ].filter(Boolean);

  const message = encodeURIComponent(lines.join("\n"));
  const url = `https://wa.me/${CAFE_WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Once the Spring Boot backend is live, call this instead (or alongside
 * the WhatsApp link) to persist the order server-side. The backend can
 * then send the WhatsApp notification itself via Twilio / Meta Cloud API.
 *
 * const API_URL = import.meta.env.VITE_API_URL;
 *
 * export async function submitOrderToServer(items, customer, total) {
 *   const res = await fetch(`${API_URL}/api/orders`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ items, customer, total }),
 *   });
 *   if (!res.ok) throw new Error("Order submission failed");
 *   return res.json();
 * }
 */