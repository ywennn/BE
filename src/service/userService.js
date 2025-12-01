const validate = require("../validation/validation");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../validation/userValidation");
const prisma = require("../db/prisma");
const bcrypt = require("bcryptjs");
const ResponseError = require("../errors/responseError");

const register = async (req) => {
  const validatedData = validate(registerUserValidation, req);

  const countUser = await prisma.user.count({
    where: {
      email: validatedData.email,
    },
  });
  if (countUser > 0) {
    throw new ResponseError(400, "User sudah ada", false);
  }
  const hashPass = await bcrypt.hash(validatedData.password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: validatedData.name,
      email: validatedData.email,
      password: hashPass,
      role: validatedData.role || "MEMBER",
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return newUser;
};

const login = async (req) => {
  const validatedData = validate(loginUserValidation, req);

  const findUser = await prisma.user.findUnique({
    where: {
      email: validatedData.email,
    },
    select: {
      email: true,
      name: true,
      photoUrl: true,
      createdAt: true,
    },
  });

  if (!findUser) {
    throw new ResponseError(400, "Email atau Password salah", false);
  }
  const passwordUser = findUser.password;

  const decode = await bcrypt.compare(validatedData.password, passwordUser);
  if (!decode) {
    throw new ResponseError(400, "Email atau Password salah", false);
  }
};

module.exports = {
  register,
  login,
};
