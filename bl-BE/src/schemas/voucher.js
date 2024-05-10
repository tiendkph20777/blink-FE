import Joi from "joi";

export const voucherSchema = Joi.object({
    code: Joi.string().required(),
    value: Joi.number().required(),
    quantity: Joi.number(),
    date_start: Joi.date().iso().allow(null),
    date_end: Joi.date().iso().allow(null),
    status: Joi.boolean().default(true)
});
