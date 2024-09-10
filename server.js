// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Mock endpoint for sending UPI payment request
app.post('/send-payment-request', async (req, res) => {
    const { upiId, amount, note } = req.body;

    // Here you would call the payment provider API to send the request
    // Example with Razorpay (replace with actual API call)
    try {
        // Simulating an API call to send payment request
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

// Mock function simulating an API call to send UPI payment request
async function sendUPIPaymentRequest(upiId, amount, note) {
    // In a real implementation, this would be an API call to the payment provider
    return { success: true };  // Simulating a successful request
}

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
