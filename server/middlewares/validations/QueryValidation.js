/**
 * @class QueryValidation
 */
class QueryValidation {
  /**
     * validate query parameters
     *
     * @param {object} req
     * @param {object} res
     * @param {func} next
     *
     * @return {void}
     */
  static queryValidation(req, res, next) {
    let { limit, page } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 15);
    let order = req.query.order || 'ASC';
    order = order.toUpperCase();
    if (order !== 'DESC' && order !== 'ASC') {
      order = 'ASC';
    }
    req.query.page = (page && Number.isInteger(page) && page > 0) ? page : 1;
    req.query.limit = (limit && Number.isInteger(limit) && limit > 0) ? limit : 15;
    req.query.order = order;
    next();
  }
}

export default QueryValidation;
