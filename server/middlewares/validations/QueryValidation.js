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
    limit = parseInt(limit, 10);
    req.query.page = (page && Number.isInteger(page) && page > 0) ? page : 1;
    req.query.limit = (limit && Number.isInteger(limit) && limit > 0) ? limit : 20;
    next();
  }
}

export default QueryValidation;
