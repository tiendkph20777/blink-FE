import Checkout from '../model/checkout';
import CartDetail from '../model/cartDetail';
import Cart from '../model/cart';
import moment from 'moment';
import querystring from 'qs'
import crypto from 'crypto'


export const createCheckout = async (req, res) => {
    const {
        products,
        user_id,
        dateCreate,
        total,
        address,
        status,
        Note,
        fullName,
        email,
        tel,
        voucherCode,
        shipping,
        payment_id,
        payment,
        PaymentAmount,
        noteCancel,
    } = req.body;
    try {
        const checkoutItem = new Checkout({
            products,
            total,
            user_id,
            dateCreate,
            address,
            status,
            Note,
            fullName,
            email,
            tel,
            voucherCode,
            shipping,
            payment_id,
            payment,
            PaymentAmount,
            noteCancel,
        });

        const savedCheckoutItem = await checkoutItem.save();
        console.log(savedCheckoutItem.id);
        if (payment === 'Thanh toán online') {
            process.env.TZ = 'Asia/Ho_Chi_Minh';

            let date = new Date();
            let createDate = moment(date).format('YYYYMMDDHHmmss');

            let ipAddr =
                req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;

            // let config = require('config');

            let tmnCode = 'I3UVE4XE';
            let secretKey = 'CZIHXHWLNQFGODXUJFOBFUEGFCBLIVRV';
            let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
            let returnUrl = 'http://localhost:5173/purchase';
            let orderId = savedCheckoutItem.id;
            let amount = req.body.total;
            // let bankCode = '';

            let locale = 'vn';
            // if (locale === null || locale === '') {
            // 	locale = 'vn';
            // }
            let currCode = 'VND';
            let vnp_Params = {};
            vnp_Params['vnp_Version'] = '2.1.0';
            vnp_Params['vnp_Command'] = 'pay';
            vnp_Params['vnp_TmnCode'] = tmnCode;
            vnp_Params['vnp_Locale'] = locale;
            vnp_Params['vnp_CurrCode'] = currCode;
            vnp_Params['vnp_TxnRef'] = orderId;
            vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
            vnp_Params['vnp_OrderType'] = 'other';
            vnp_Params['vnp_Amount'] = amount * 100;
            vnp_Params['vnp_ReturnUrl'] = returnUrl;
            vnp_Params['vnp_IpAddr'] = ipAddr;
            vnp_Params['vnp_CreateDate'] = createDate;


            vnp_Params = sortObject(vnp_Params);

            let signData = querystring.stringify(vnp_Params, { encode: false });

            let hmac = crypto.createHmac('sha512', secretKey);
            let signed = hmac
                .update(new Buffer(signData, 'utf-8'))
                .digest('hex');
            vnp_Params['vnp_SecureHash'] = signed;
            vnpUrl +=
                '?' + querystring.stringify(vnp_Params, { encode: false });

            //return res.redirect(''https://flutterawesome.com/tag/tools/)/;//
            console.log(vnpUrl)
            res.status(200).json(vnpUrl);
            // res.status(201).json(savedCheckoutItem);
        }
        else if (payment === 'Thanh toán khi nhận hàng') {
            res.status(201).json(savedCheckoutItem);
            console.log('thanh toan khi nhan hang');
        } else {
            console.log('ban chua chon phuong thuc thanh toan');
            res.status(400).json({ message: error.message });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeProductToCheckout = async (req, res) => {
    try {
        const { cart_id, productDetail_id } = req.params;
        // Tìm chi tiết giỏ hàng có cart_id tương ứng
        const cartDetail = await CartDetail.findOne({
            cart_id: cart_id,
            productDetailId: productDetail_id,
        });
        if (!cartDetail) {
            return res
                .status(404)
                .json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng.' });
        }
        // Xóa sản phẩm từ chi tiết giỏ hàng
        const removeProducToCheckout = await CartDetail.deleteOne({
            cart_id: cart_id,
            productDetailId: productDetail_id,
        });
        res.status(201).json({
            message: 'Đã xóa sản phẩm khỏi giỏ hàng.',
            removeProducToCheckout,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const getCheckout = async (req, res) => {
    try {
        const checkout = await Checkout.find();
        if (!checkout) {
            return res.status(404).json({
                message: 'Thủ tục thanh toán trống',
            });
        }
        return res.json(checkout);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const getOneCheckout = async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({
                message: 'Thủ tục thanh toán không tồn tại',
            });
        }
        return res.json(checkout);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const removeCheckout = async (req, res) => {
    try {
        const checkout = await Checkout.findByIdAndDelete(req.params.id);
        if (!checkout) {
            return res.status(404).json({
                message: 'Không tìm thấy Thủ tục thanh toán để xóa',
            });
        }
        return res.json({
            message: 'Xóa Thủ tục thanh toán thành công',
            checkout,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const updateCheckout = async (req, res) => {
    try {
        const id = req.params.id;
        const checkout = await Checkout.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!checkout) {
            return res.json({
                message: 'Cập nhật checkout không thành công',
            });
        }
        return res.json({
            message: 'Cập nhật checkout thành công',
            checkout,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            '+'
        );
    }
    return sorted;
}

