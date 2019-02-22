import { Op } from 'sequelize';
import db from '../database/models';

const {
  ShoppingCart,
  AttributeValue,
  Product,
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
      buyNow
    } = req.body.cart;

    const attributeArray = [];
    try {
      const attributesToString = attributes.toString();
      ShoppingCart.findOne({
        where: {
          product_id: productId,
          attribute: {
            [Op.like]: `%${attributesToString}%`
          }
        }
      }).then((item) => {
        if (item) {
          res.status(400).json({
            message: `This item has already been added to the cart,
            go to cart and update the quantity`
          });
        }
      }).catch(next);
    } finally {
      attributes.forEach(value => AttributeValue.find({
        where: {
          value: {
            [Op.like]: value
          }
        }
      }).then((attributeValue) => {
        if (!attributeValue) {
          res.status(404).json({
            message: 'The attribute value provided does not exist'
          });
        }
        attributeArray.push(attributeValue.dataValues.value);
      }));
      Product.findOne({
        attributes:
          {
            exclude: ['product_id', 'createdAt', 'updatedAt']
          },
        where: {
          id: productId
        }
      }).then((item) => {
        if (!item) {
          res.status(404).json({
            message: 'Item not found'
          });
        }
        const attributeString = attributeArray.toString();
        ShoppingCart.create({
          product_id: productId,
          customer_id: req.decoded.customerId,
          attribute: attributeString,
          quantity,
          buy_now: buyNow,
        }).then((cart) => {
          res.status(201).json({
            cart,
            message: 'Item added to cart successfully'
          });
        }).catch(next);
      }).catch(next);
    }
  }
}

export default ShoppingCartController;
