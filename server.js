require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Credential = require('./models/Credential');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ DB Connection Error:", err));

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use an App Password, not your login password
    }
});

// API to fetch stock counts for the frontend
app.get('/api/stock', async (req, res) => {
    try {
        const stockCounts = await Credential.aggregate([
            { $match: { isSold: false } },
            { $group: { _id: "$productName", count: { $sum: 1 } } }
        ]);
        const formattedStock = stockCounts.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});
        res.json(formattedStock);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch stock" });
    }
});

// Paystack Webhook
app.post('/paystack-webhook', async (req, res) => {
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET)
                       .update(JSON.stringify(req.body))
                       .digest('hex');

    if (hash === req.headers['x-paystack-signature']) {
        const { event, data } = req.body;

        if (event === 'charge.success') {
            const customerEmail = data.customer.email;
            const productName = data.metadata.custom_fields[0].value;

            // Atomic find and update to prevent double-selling
            const account = await Credential.findOneAndUpdate(
                { productName: productName, isSold: false },
                { isSold: true, customerEmail: customerEmail, soldAt: new Date() },
                { new: true }
            );

            if (account) {
                const mailOptions = {
                    from: '"ClearView Store" <' + process.env.EMAIL_USER + '>',
                    to: customerEmail,
                    subject: `Your ${productName} Credentials`,
                    text: `Thank you for your purchase!\n\nDetails: ${account.accountDetails}\n\nEnjoy!`
                };
                await transporter.sendMail(mailOptions);
            } else {
                // Out of stock alert to admin
                console.log(`Inventory Alert: ${productName} is out of stock!`);
            }
        }
    }
    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
