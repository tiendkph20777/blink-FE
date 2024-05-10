import { voucherSchema } from "../schemas/voucher";
import Voucher from "../model/voucher";


export const updateVoucherStatusById = async (req, res) => {
  try {
    const { id, status } = req.params;

    // Chuyển đổi trạng thái từ chuỗi sang boolean (nếu cần)
    const newStatus = status === "false";

    const voucher = await Voucher.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }

    return res.status(200).json({
      message: "Cập nhật trạng thái sản phẩm thành công",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Lấy danh sách tất cả các voucher
export const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    if (!vouchers || vouchers.length === 0) {
      return res.status(404).json({
        message: "Voucher not found",
      });
    }
    return res.json(vouchers);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
// Tạo một voucher mới
export const createVoucher = async (req, res) => {
  try {
    const { error } = voucherSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const { code, value, quantity, status, date_start, date_end } = req.body;
    if (!date_start) {
      return res.status(400).json({ message: "Ngày bắt đầu là bắt buộc" });
    }
    if (date_end && new Date(date_end) <= new Date(date_start)) {
      return res
        .status(400)
        .json({ message: "Ngày kết thúc phải sau ngày bắt đầu" });
    }

    const voucher = new Voucher({
      code,
      value,
      quantity,
      status,
      date_start,
      date_end,
    });
    await voucher.save();
    res.status(201).json(voucher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin một voucher bằng code
export const getVoucherByCode = async (req, res) => {
  try {
    const { code } = req.params;
    if (!code) {
      return res.status(400).json({ error: "Mã voucher không hợp lệ" });
    }
    const voucher = await Voucher.findOne({ code });

    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    if (voucher.date_end && new Date() > voucher.date_end) {
      return res.status(400).json({ error: "Voucher đã hết hạn" });
    }
    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Lấy thông tin một voucher bằng id
export const getVoucherById = async (req, res) => {
  try {
    const id = req.params.id;
    const voucher = await Voucher.findById(id);

    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    if (voucher.date_end && new Date() > voucher.date_end) {
      return res.status(400).json({ error: "Voucher đã hết hạn" });
    }
    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin một voucher bằng ID
export const updateVoucherById = async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Xóa voucher
export const removeVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndDelete(req.params.id);
    if (!voucher) {
      return res.status(404).json({
        message: "Voucher not found",
      });
    }
    return res.json({
      message: "Voucher deleted successfully",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
