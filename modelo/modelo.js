const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/]
    }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;