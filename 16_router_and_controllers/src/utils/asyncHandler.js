export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    res.send(error.code || 500).json({
      status: false,
      message: error.message,
    });
  }
};
