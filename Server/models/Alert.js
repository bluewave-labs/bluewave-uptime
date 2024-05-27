const mongoose = require('mongoose')

const AlertSchema = mongoose.Schema(
    {
        checkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Check',
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
