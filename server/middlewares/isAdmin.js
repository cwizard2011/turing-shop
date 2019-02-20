/**
   * Check if a user is an admin
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - Next function
   * @returns {function} - Next middleware
   */
const isAdmin = (req, res, next) => {
  if (req.decoded.role !== 'admin') {
    return res.status(403).json({
      message: 'Access denied'
    });
  }
  return next();
};

export default isAdmin;
