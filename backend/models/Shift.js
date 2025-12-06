const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String, // Storing as YYYY-MM-DD
        required: true
    },
    startTime: {
        type: String, // HH:mm
        required: true
    },
    endTime: {
        type: String, // HH:mm
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Shift', ShiftSchema);
