import { productSchema } from "../schemas/product";
import Product from "../model/product";
import Brand from "../model/brand";
import ProductDetail from "../model/productDetail";

export const updateProductStatus = async (req, res) => {
  try {
    const { product_id, status } = req.params;
    const product = await Product.findByIdAndUpdate(
      product_id,
      { $set: { status } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm để cập nhật trạng thái",
      });
    }

    return res.json({
      message: "Cập nhật trạng thái sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "Không có sản phẩm nào trong cơ sở dữ liệu",
      });
    }
    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const { name, brand_id } = req.body;
    const existingBrand = await Brand.findOne({ _id: brand_id });
    if (!existingBrand) {
      return res.status(400).json({
        message: "thương hiệu không tồn tại",
      });
    }
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({
        message: "Sản phẩm đã tồn tại",
      });
    }
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, brand_id } = req.body;
    const existingBrand = await Brand.findOne({ _id: brand_id });
    if (!existingBrand) {
      return res.status(400).json({
        message: "thương hiệu không tồn tại",
      });
    }
    const existingProduct = await Product.findOne({
      name,
      _id: { $ne: id },
    });
    if (existingProduct) {
      return res.status(400).json({
        message: "Sản phẩm đã tồn tại",
      });
    }
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await Product.findByIdAndDelete(product_id);
    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm để xóa",
      });
    }
    await ProductDetail.deleteMany({ product_id });
    return res.json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const reductionProduct = async (req, res) => {
  try {
    const { product_id, quantityProduct } = req.params;
    // const { quantityProduct } = req.body;
    const product = await ProductDetail.findById({ _id: product_id });

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm để giảm số lượng",
      });
    }

    if (isNaN(quantityProduct) || quantityProduct <= 0) {
      return res.status(400).json({
        message: "Số lượng giảm không hợp lệ",
      });
    }

    console.log(product.quantity);

    const updatedProduct = await ProductDetail.findByIdAndUpdate(
      { _id: product_id },
      { $inc: { quantity: -quantityProduct } },
      { new: true }
    );

    return res.json({
      message: "Giảm số lượng sản phẩm thành công",
      updatedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const increaseProduct = async (req, res) => {
  try {
    const { product_id, quantityProduct } = req.params;
    // const { quantityProduct } = req.body;
    const product = await ProductDetail.findById({ _id: product_id });

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm để tăng số lượng",
      });
    }

    if (isNaN(quantityProduct) || quantityProduct <= 0) {
      return res.status(400).json({
        message: "Số lượng tăng không hợp lệ",
      });
    }

    console.log(product.quantity);

    const updatedProduct = await ProductDetail.findByIdAndUpdate(
      { _id: product_id },
      { $inc: { quantity: +quantityProduct } },
      { new: true }
    );

    return res.json({
      message: "Tăng số lượng sản phẩm thành công",
      updatedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
