// controllers/paymentController.js
const paymentService = require("../services/payService");

async function payment(req, res) {
  const { price, address, userName, to } = req.body;
  const host = req.get("origin");
  console.log("host is ---->", host);
  try {
    if (!host) {
      throw new Error("Host is not defined in the request");
    }

    const result = await paymentService.createPayment(
      price,
      address,
      userName,
      to,
      host
    );
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}

async function getPayments(req, res) {
  const userName = req.params.userName;

  try {
    const result = await paymentService.getPaymentsByUserName(userName);

    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  payment,
  getPayments,
};
