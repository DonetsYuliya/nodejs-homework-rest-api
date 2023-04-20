const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    next();
  };
};

module.exports = validateBody;
