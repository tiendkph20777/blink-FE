import joi from "joi";

export const commentSchema = joi.object({
    id_product: joi.string().required(),
    id_user: joi.string().required(),
    images: joi.array(),
    rate: joi.number().required(),
    content: joi.string().required(),
});