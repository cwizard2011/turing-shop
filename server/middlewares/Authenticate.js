import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../database/models';

dotenv.config();
const { Customer } = db;

const secret = process.env.SECRET_KEY;

/**
 * @class Authenticate
 */
class Authenticate {
  /**
 * @description it authenticates the validity of user
 *
 * @return {void}
 *
 * @param {param} req
 * @param {param} res
 * @param {func} next
 */
  static auth(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      Authenticate.verifyUser(req, res, next, token);
    } else {
      return res.status(401).json({
        message: 'You need to signup or login to perform this action'
      });
    }
  }

  /**
 * @description it authenticates the validity of user
 *
 * @return {void}
 *
 * @param {param} req
 * @param {param} res
 * @param {func} next
 * @param {param} token
 */
  static verifyUser(req, res, next, token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'You do not have permission to this page.'
        });
      }
      Customer.findByPk(decoded.customerId)
        .then((user) => {
          if (user) {
            req.decoded = {
              ...user.toAuthJSON(),
              customerId: decoded.customerId,
            };
            return next();
          }
          return res.status(401).json({
            message: 'User with this token not found.'
          });
        })
        .catch(next);
    });
  }
}

export default Authenticate;
