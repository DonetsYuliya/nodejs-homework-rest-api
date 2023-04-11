const tryCatchWrapper = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res);
    } catch (error) {
      if (error.path) {
        return res.status(400).json({
          code: 400,
          message: `Contact with ${error.stringValue} not found`,
        });
      }
      next(error);
    }
  };
};

module.exports = tryCatchWrapper;
