const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const app = express();
app.use(bodyParser.json());

// Configure Razorpay with live key
const razorpay = new Razorpay({
    key_id: 'rzp_live_1s0etn5Ap6APqS',         // Your Razorpay live key ID
    key_secret: 'INCztFyfHbpaadUF44rHqeWG'  // Your Razorpay live key secret
});

// Endpoint to send UPI payment request
app.post('/send-payment-request', async (req, res) => {
    const { upiId, amount, note } = req.body;

    try {
        const paymentResponse = await sendUPIPaymentRequest(upiId, amount, note);
        
        if (paymentResponse.success) {
            res.json({ success: true, message: 'Payment request sent.' });
        } else {
            res.json({ success: false, message: 'Failed to send payment request.' });
        }
    } catch (error) {
        console.error('Payment Request Error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// Function to simulate sending a UPI payment request
async function sendUPIPaymentRequest(upiId, amount, note) {
    try {
        const paymentOptions = {
            amount: amount * 100, // Amount in paise (1 INR = 100 paise)
            currency: 'INR',
            receipt: 'receipt#1', // Optional
            notes: {
                note: note
            }
        };
        
        // Create a payment order (Replace with actual request if required)
        const order = await razorpay.orders.create(paymentOptions);

        // Simulating successful payment request response
        return { success: true, order };
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false };
    }
}

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
