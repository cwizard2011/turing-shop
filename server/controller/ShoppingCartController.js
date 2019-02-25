import db from '../database/models';


const {
  ShoppingCart,
  AttributeValue,
  Product,
  Customer,
} = db;

/**
 * @class ShoppingCartController
 */
class ShoppingCartController {
  /**
     *
     * @param {*} req request object
     * @param {*} res response object
     * @param {*} next
     *
     * @returns {object} shopping cart object
     */
  static addItemToCart(req, res, next) {
    const {
      productId,
      attributes,
      quantity,
    } = req.body.cart;

    const attributeArray = [];
    attributes.forEach(value => AttributeValue.findOne({
      where: {
        value: {
          $eq: value
        }
      }
    }).then((attributeValue) => {
      if (!attributeValue) {
        return res.status(400).json({
          message: 'The attribute value provided does not exist'
        });
      }
      attributeArray.push(attributeValue.dataValues.value);
    }));
    Product.find({
      attributes:
          {
            exclude: ['createdAt', 'updatedAt']
          },
      where: {
        id: productId
      }
    }).then((item) => {
      if (!item) {
        return res.status(404).json({
          message: 'Item not found'
        });
      }
      const attributeString = attributeArray.toString();
      ShoppingCart.create({
        product_id: productId,
        customer_id: req.decoded.customerId,
        attribute: attributeString,
        quantity,
      }).then(cart => res.status(201).json({
        cart,
        message: 'Item added to cart successfully'
      })).catch(next);
    }).catch(next);
  }

  /**
   *
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next
   *
   * @returns {object} Returns all items in the cart
   */
  static getAllCartItems(req, res, next) {
    ShoppingCart.findAndCountAll({
      include: [{
        model: Product,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }, {
        model: Customer
      }],
      where: {
        customer_id: req.decoded.customerId
      }
    })
      .then((items) => {
        if (!items) {
          return res.status(404).json({
            message: 'No item in the cart at the moment'
          });
        }
        return res.status(200).json({
          items
        });
      }).catch(next);
  }

  /**
   *
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next call next function/handler
   *
   * @returns {object} Updated cart
   */
  static updateCartItem(req, res, next) {
    const { cartId } = req.params;
    const {
      quantity
    } = req.body.cart;

    ShoppingCart.findOne({
      where: {
        id: cartId,
        customer_id: req.decoded.customerId
      }
    }).then((item) => {
      if (!item) {
        return res.status(404).json({
          message: 'Item not found in the cart'
        });
      }
      item.update({
        quantity: quantity || item.quantity
      });
      return res.status(200).json({
        updatedItem: {
          item
        }
      });
    }).catch(next);
  }

  /**
   *
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next next function or middleware
   *
   * @return {object} deleted object
   */
  static deleteCartItem(req, res, next) {
    const { cartId } = req.params;

    ShoppingCart.findOne({
      where: {
        id: cartId,
        customer_id: req.decoded.customerId,
      }
    }).then((item) => {
      if (!item) {
        return res.status(400).json({
          message: 'Item not found in the cart'
        });
      }
      item.destroy();
      return res.status(200).json({
        message: 'Item successfully deleted'
      });
    }).catch(next);
  }
}

export default ShoppingCartController;
