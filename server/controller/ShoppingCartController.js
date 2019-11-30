import { Op } from 'sequelize';
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
          [Op.eq]: value
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
    Product.findOne({
      attributes:
          {
            exclude: ['createdAt', 'updatedAt']
          },
      where: {
        product_id: productId
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
        attributes: attributeString,
        quantity,
      }).then(cart => res.status(201).json({
        cart,
        totalItems: quantity,
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
          return res.status(200).json({
            message: 'No item in the cart at the moment',
            totalItems: 0
          });
        }
        const quantityArray = [];
        const totalArray = [];
        const discountArray = [];

        items.rows.map((item) => {
          const price = parseFloat(item.quantity * item.Product.price);
          const discount = parseFloat(item.Product.discounted_price);
          totalArray.push(price);
          discountArray.push(discount);
          quantityArray.push(item.quantity);
          return null;
        });
        if (quantityArray.length > 0) {
          const totalItems = quantityArray.reduce((preValue, nextValue) => (
            preValue + nextValue));
          const subTotal = totalArray.reduce((prev, curr) => prev + curr);
          const totalDiscount = discountArray.reduce((prev, curr) => prev + curr);
          const finalPrice = subTotal - totalDiscount;
          return res.status(200).json({
            totalItems,
            subTotal,
            totalDiscount,
            finalPrice,
            items,
          });
        }
        return res.status(200).json({
          message: 'No item in the cart at the moment',
          totalItems: 0
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
        item_id: cartId,
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
        },
        totalItems: item.quantity
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
        item_id: cartId,
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
