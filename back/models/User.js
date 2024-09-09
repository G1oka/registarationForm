const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    personalNumber: { type: String },  // For Person
    livingAddress: { type: String },   // For Person
    organizationName: { type: String },  // For Organization
    identificationCode: { type: String }, // For Organization
    actualAddress: { type: String }, // For Organization
    contactPerson: { type: String },  // For Organization
    phoneNumber: { type: String, require: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    newsSubscription: { type: Boolean, default: false },
}, { collection: 'authorization' }); // Use 'authorization' collection

module.exports = mongoose.model('User', UserSchema);
