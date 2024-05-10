import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./routes/product";
import brandRouter from "./routes/brand";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";
import roleRouter from "./routes/role";
import commentRouter from './routes/comment';
// import cartRouter from './routes/cart';
// import paymentRouter from "./routes/order";
import voucherRouter from "./routes/voucher";
import cartRouter from "./routes/cart";
import productDetailRouter from "./routes/productDetail";
import paymentRouter from "./routes/payment";
import checkoutRouter from "./routes/checkout";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", brandRouter)
app.get("/api", (req, res) => {
    res.send("Lấy dữ liệu thành công");
});
app.use("/api", productRouter)
app.use("/api", productDetailRouter)
app.use("/api", userRouter)
app.use("/api", authRouter)
app.use("/api", roleRouter)
app.use("/api", commentRouter)
app.use("/api", voucherRouter)
app.use("/api", cartRouter)
app.use("/api", paymentRouter)
app.use("/api", checkoutRouter)


mongoose.connect("mongodb+srv://laxus:IxnIvFuEVLsMlBhv@cluster0.yfuqvhg.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// mongoose.connect("mongodb://127.0.0.1:27017/DATN", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// Sự kiện khi kết nối thành công
mongoose.connection.on("connected", () => {
    console.log("Kết nối đến MongoDB thành công");
});

// Sự kiện khi kết nối bị lỗi
mongoose.connection.on("error", (err) => {
    console.error("Kết nối đến MongoDB thất bại:", err);
});

// Sự kiện khi ngắt kết nối
mongoose.connection.on("disconnected", () => {
    console.log("Ngắt kết nối đến MongoDB");
});


export const viteNodeApp = app;
