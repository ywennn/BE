const ResponseError = require("../errors/responseError");

const validate = (schema, req) => {
  const result = schema.validate(req, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    const errors = result.error.details.map((detail) => detail.message);
    throw new ResponseError(400, errors.join(", ", false));
  } else {
    return result.value;
  }
};

module.exports = validate;
