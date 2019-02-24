import { Op } from 'sequelize';
import Validator from 'validatorjs';
import db from '../../database/models';

const { ShoppingCart } = db;

/**
 * @class ShoppingCartValidation
 *
 */
class ShoppingCartValidation {
  /**
   * @description checks if the item to be added to the cart already exist
   * in the user's shopping cart
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next next function/middleware
   *
   * @returns {function} next function
   */
  static checkCartItem(req, res, next) {
    const {
      productId,
      attributes,
    } = req.body.cart;
    const attributesToString = attributes.toString();
    ShoppingCart.find({
      where: {
        product_id: productId,
        attribute: {
          [Op.like]: `%${attributesToString}%`
        }
      }
    }).then((item) => {
      if (item) {
        return res.status(400).json({
          message: `This item has already been added to the cart,
              go to cart and update the quantity`
        });
      }
      return next();
    }).catch(next);
  }

  /**
   *
   * @param {object} req request object for adding item to cart
   * @param {Object} res response object
   * @param {function} next calls the next function or middleware
   *
   * @returns {function} returns the next function
   */
  static validateCartInput(req, res, next) {
    const {
      productId,
      attributes,
      quantity
    } = req.body.cart;

    const data = {
      productId,
      attributes,
      quantity
    };

    Validator.register(
      'positiveInt', value => value > 0,
      'The cart :attribute must be a positive integer',
    );
    const rules = {
      productId: 'required|integer|positiveInt',
      attributes: 'required|array',
      quantity: 'required|integer|positiveInt'
    };

    const message = {
      'required.productId': ':attribute field cannot be empty',
      'integer.productId': 'The productId must be an integer',
      'required.attributes': ':attribute field cannot be empty',
      'array.attributes': 'attributes only accept array of string',
      'required.quantity': ':attribute field cannot be empty',
      'integer.quantity': 'The quantity must be an integer',
    };

    const validation = new Validator(data, rules, message);

    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      errors: validation.errors.all()
    });
  }

  /**
   * @description validateCartUpdate it validates cart quantity on update
   *
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next next function/middleware
   *
   * @returns {function} returns next function/middleware
   */
  static validateCartUpdate(req, res, next) {
    const { quantity } = req.body.cart;
    const data = {
      quantity
    };
    Validator.register(
      'positiveInt', value => value > 0,
      'The cart :attribute must be a positive integer',
    );
    const rules = {
      quantity: 'integer|positiveInt'
    };

    const validation = new Validator(data, rules);
    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      errors: validation.errors.all()
    });
  }
}

export default ShoppingCartValidation;
