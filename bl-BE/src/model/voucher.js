import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        date_start: {
            type: Date,
            required: true,
        },
        date_end: {
            type: Date,
            default: null,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Voucher", voucherSchema);
