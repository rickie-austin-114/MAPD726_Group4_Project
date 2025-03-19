
const express = require("express")
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51QuLVCPlUnLIZAQCClpe9GrFfw1Ui8wJwxtRXx9RaLR0SrVpTKaygWEMIpXAsfTjROJDIO9xP8dn1BpQdaaTXGg700G1iaVNNx'); // Replace with your secret key

const router = express.Router();


// Endpoint to create a payment intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  const payment_amount = amount * 100; // as stripe use amount in cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: payment_amount, 
      currency: 'cad',
      metadata: {
        merchant_display_name: 'TourVia - MAPD726 Group 4', 
    },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;