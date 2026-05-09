const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    accountDetails: { type: String, required: true },
    isSold: { type: Boolean, default: false },
    customerEmail: { type: String, default: null },
    soldAt: { type: Date }
});

module.exports = mongoose.model('Credential', credentialSchema);
