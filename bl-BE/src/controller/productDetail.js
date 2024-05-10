
import { productDetailSchema } from '../schemas/productDetail';
import ProductDetail from '../model/productDetail';

export const getAllProductDetail = async (req, res) => {
    try {
        const productdetail = await ProductDetail.find();
        if (!productdetail || productdetail.length === 0) {
            return res.status(404).json({
                message: "Không có sản phẩm nào trong cơ sở dữ liệu"
            });
        }
        return res.json(productdetail);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const getAllProductDetailAllProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const productDetail = await ProductDetail.find({ product_id });
        if (!productDetail || productDetail.length === 0) {
            return res.status(404).json({
                message: "Không có sản phẩm nào trong cơ sở dữ liệu"
            });
        }
        return res.json(productDetail);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const getProductDetailByIdProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const productDetail = await ProductDetail.findById(product_id);
        if (!productDetail) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });
        }
        return res.json({ productDetail });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}



export const createProductDetail = async (req, res) => {
    try {
        const { error } = productDetailSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message)
            });
        }
        const { size, quantity, product_id,price_var } = req.body;
        const existingProductDetail = await ProductDetail.findOne({ product_id, size, quantity,price_var });
        if (existingProductDetail) {
            return res.status(400).json({
                message: "Thông tin đã tồn tại"
            });
        }
        const productDetail = await ProductDetail.create({ product_id, size, quantity,price_var });
        return res.status(201).json(productDetail);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const updateProductDetail = async (req, res) => {
    try {
        const { product_id } = req.params;
        const product = await ProductDetail.findByIdAndUpdate(
            product_id,
            req.body,
            {
                new: true,
            }
        );
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công"
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const removeProductDetailbyID = async (req, res) => {
    try {
        const { product_id } = req.params
        const product = await ProductDetail.findByIdAndDelete(product_id);
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm để xóa"
            });
        }
        return res.json({
            message: "Xóa sản phẩm thành công",
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

