const { register } = require("../service/userService");

const registerUser = async (req, res, next) => {
  try {
    const result = await register(req.body);
    return res.status(200).json({
      success: true,
      message: "Berhasil registrasi",
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  registerUser,
};
