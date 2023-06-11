const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
    Types: { ObjectId },
} = Schema;

const ChargeHistorySchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'user',
    },
    amount: Number,
    chargedAt: {
        type: Date,
        default: Date.now,
        expires: '1y',
    },
});

const UsedHistorySchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'user',
    },
    amount: Number,
    usedAt: {
        type: Date,
        default: Date.now,
        expires: '1y',
    },
});

ChargeHistorySchema.index({ chargedAt: 1 }, { expireAfterSeconds: 0 });
UsedHistorySchema.index({ usedAt: 1 }, { expireAfterSeconds: 0 });

const Charge = mongoose.model('charge', ChargeHistorySchema);
const Used = mongoose.model('used', UsedHistorySchema);

module.exports = { Charge, Used };