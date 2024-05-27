const mongoose = require('mongoose')

const CheckSchema = mongoose.Schema(
    {
        monitorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Monitor',
            immutable: true,
        },
        status: {
            type: Boolean,
        },
        responseTime: {
            type: Number, // milliseconds
        },
        statusCode: {
            type: Number, // 200, ... , 500
        },
        message: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Check', CheckSchema);
