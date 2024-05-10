import mongoose from "mongoose";

const productDetailSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    size: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    price_var: {
        type: Number,
        require: true,
    },
},
    {
        timestamps: true,
        versionKey: false
    },
);

export default mongoose.model("ProductDetail", productDetailSchema);
