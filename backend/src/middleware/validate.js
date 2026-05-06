export const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    res.status(400);
    return next(new Error(error.details.map((detail) => detail.message).join(', ')));
  }

  req[property] = value;
  next();
};
