import joi from 'joi'

export const userSchema = joi.object({
    image: joi.string(),
    fullName: joi.string().required().messages({
        "any.required": "Họ và tên là bắt buộc",
    }),
    aboutme: joi.string(),
    gender: joi.string(),
    address: joi.string(),
    city: joi.string(),
    commune: joi.string(),
    district: joi.string(),
    tel: joi.string(),
    email: joi.string().email().required().messages({
        "string.email": "Email không đúng định dạng ",
        "string.empty": "Email không được để trống",
        "any.required": "Email là bắt buộc",
    }),
    password: joi.string().required().min(6).max(20).messages({
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "string.max": "Mật khẩu nhiều nhất {#limit} ký tự",
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Mật khẩu là bắt buộc",
    }),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
        "any.only": "ConfirPassword là bắt buộc",
        "any.required": "Vui lòng nhập lại Password"
    }),
    role_id: joi.string(),
});


export const signinSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.email": "email không đúng định dạng",
        "string.empty": "email không được để trông",
        "any.required": "email là bắt buộc"
    }),
    password: joi.string().required().min(6).max(20).messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.empty": "Mật khẩu là bắt buộc",
        "string.min": "Mật khẩu phải ít nhất {#limit} ký tự",
        "string.max": "Mật khẩu nhiều nhất {#limit} ký tự",
    })
})