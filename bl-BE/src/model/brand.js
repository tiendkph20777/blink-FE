import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
},
    {
        timestamps: true,
        versionKey: false
    })
export default mongoose.model("Brand", brandSchema);


