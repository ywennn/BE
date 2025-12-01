const Joi = require("joi");

const registerUserValidation = Joi.object({
  name: Joi.string().alphanum().min(3).required().messages({
    "string.alphanum": "Nama hanya bisa diisi dengan huruf dan angka",
    "string.min": "Nama setidaknya memiliki 3 Karakter",
    "string.empty": "Nama harus diisi",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Format email tidak valid",
    "any.required": "Email harus diisi",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password minimal 8 karakter",
    "any.required": "Password harus diisi",
  }),
  role: Joi.string()
    .valid("SUPERADMIN", "ADMIN", "PENGURUS", "MEMBER")
    .optional(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Format email tidak valid",
    "any.required": "Email harus diisi",
    "string.empty": "Email tidak boleh kosong",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password minimal 8 karakter",
    "any.required": "Password harus diisi",
    "string.empty": "Password tidak boleh kosong",
  }),
});

module.exports = {
  registerUserValidation,
  loginUserValidation,
};
