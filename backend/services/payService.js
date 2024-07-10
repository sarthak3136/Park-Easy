const stripe = require("stripe")(
  "sk_test_51NVIkyFTrPPXudS3boxKM6czSM9SZj9jfet0E6l2o7ck0x7EtHK9z7FGNyeWlmZUV3mpxaT2qTf9C2yNDBkFcrHT00qPRz5W3P"
);
const Payment = require("../models/payModel");

async function createPayment(price, address, userName, to, host) {
  try {
    // Your payment creation logic here
    // const host = req.get('origin');
    // Example: Create a payment record in the database
    const payment = new Payment({
      price,
      address,
      userName,
      to,
    });
    await payment.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: address,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${host}`,
      cancel_url: `${host}/payment`,
    });

    return {
      success: true,
      message: "Operation successful",
      data: { link: session.url },
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create Stripe session" };
  }
}

async function getPaymentsByUserName(userName) {
  try {
    const paymentsMade = await Payment.find({ userName });
    const paymentsReceived = await Payment.find({ to: userName });

    return {
      success: true,
      data: {
        paymentsMade,
        paymentsReceived,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to retrieve payments",
    };
  }
}


module.exports = {
  createPayment,
  getPaymentsByUserName,
};
