const express = require("express");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: "rzp_test_ETNHrYLVBSuAXf",
  key_secret: "UYP2sQdXpf49glKrUVeDOj0o",
});

exports.razorpayPayment = async (req, res) => {
  const { amount, currency, receipt } = req.body;
  try {
    const order = await razorpay.orders.create({ amount, currency, receipt });
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send(error);
  }
};
