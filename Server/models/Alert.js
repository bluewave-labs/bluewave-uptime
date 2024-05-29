const mongoose = require('mongoose')

const AlertSchema = mongoose.Schema(
    {
        checkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Check',
            immutable: true,
        },
        monitorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Monitor',
            immutable: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            immutable: true,
        },
        status: {
            type: Boolean,
        },
        message: {
            type: String,
        },
        notifiedStatus: {
            type: Boolean,
        },
        acknowledgeStatus: {
            type: Boolean,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Alert', AlertSchema);
