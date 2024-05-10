import express from 'express';
import { } from '../controller/payment';
import {
    createCheckout,
    getCheckout,
    getOneCheckout,
    removeCheckout,
    removeProductToCheckout,
    updateCheckout,
} from '../controller/checkout';
import { checkPermission } from '../middleware/checkPermission';
import { increaseProduct, reductionProduct } from '../controller/product';
const checkoutRouter = express.Router();
import moment from 'moment';
import querystring from 'qs';
import crypto from 'crypto';

// import config from 'config';
//Them vao don hang
checkoutRouter.post('/checkout/add', createCheckout);

// Giảm số lượng sản phẩm
checkoutRouter.get(
    '/reductionProduct/:product_id/:quantityProduct',
    reductionProduct
);
// Tăng số lượng sản phẩm
checkoutRouter.get(
    '/increaseProduct/:product_id/:quantityProduct',
    increaseProduct
);

checkoutRouter.get('/checkout', getCheckout);
checkoutRouter.get('/checkout/:id', getOneCheckout);
checkoutRouter.get(
    '/checkout/:cart_id/:productDetail_id',
    removeProductToCheckout
);
checkoutRouter.put('/checkout/:id/update', updateCheckout);
checkoutRouter.delete('/checkout/:id', removeCheckout);

checkoutRouter.get('/vnpay_return', function (req, res, next) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = 'I3UVE4XE';
    let secretKey = 'CZIHXHWLNQFGODXUJFOBFUEGFCBLIVRV';

    let signData = querystring.stringify(vnp_Params, { encode: false });

    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render('success', { code: vnp_Params['vnp_ResponseCode'] });
    } else {
        res.render('success', { code: '97' });
    }
});
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

export default checkoutRouter;
