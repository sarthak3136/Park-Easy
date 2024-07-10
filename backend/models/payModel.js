const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  price: Number,
  address: String,
  userName: String,
  to: String,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
