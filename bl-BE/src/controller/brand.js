
import { brandSchema } from '../schemas/brand';
import Brand from '../model/brand';
export const getAllBrands = async (req, res) => {
    try {
        const brand = await Brand.find();
        if (!brand) {
            return res.status(404).json({
                message: "thương hiệu trống"
            });
        }
        return res.json(brand);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const getBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({
                message: "thương hiệu không tồn tại"
            });
        }
        return res.json(brand);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


export const createBrand = async (req, res) => {
    try {
        const { error } = brandSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message)
            });
        }
        const { name } = req.body;
        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            return res.status(400).json({
                message: "thương hiệu đã được tạo trước đó"
            });
        }
        const brand = await Brand.create(req.body);
        return res.status(201).json(brand);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const removeBrand = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id);
        if (!brand) {
            return res.status(404).json({
                message: "Không tìm thấy thương hiệu để xóa"
            });
        }
        return res.json({
            message: "Xóa thương hiệu thành công",
            brand,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


export const updateBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const existingBrand = await Brand.findOne({
            name,
            _id: { $ne: req.params.id }
        });
        if (existingBrand) {
            return res.status(400).json({
                message: "thương hiệu đã được tạo trước đó"
            });
        }
        const brand = await Brand.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
            }
        );
        if (!brand) {
            return res.json({
                message: "Cập nhật thương hiệu không thành công"
            });
        }
        return res.json({
            message: "Cập nhật thương hiệu thành công",
            brand,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}
