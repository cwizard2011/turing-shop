import stripe from 'stripe';
import db from '../database/models';
import Mailer from '../helpers/mailer/Mailer';

const {
  Customer,
  Order,
  ShoppingCart,
  Product,
  Shipping,
  ShippingRegion
} = db;

const stripePayment = stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @class CheckoutController
 * @description handles users checkout and payment
 */
class CheckoutController {
  /**
     *
     * @param {obeject} req request object
     * @param {*} res response object
     * @param {*} finalPrice total price of the order
     * @param {String} description comment/description of an order
     * @param {Integer} shippingId
     * @param {*} shippingCost
     * @param {*} shippingType
     * @param {*} customerId
     * @param {*} stripeToken
     * @param {*} stripeEmail
     * @param {*} next calls next function or middleware
     *
     * @returns {function} returns the next function/middleware
     */
  static checkoutQuery(
    req,
    res,
    finalPrice,
    description = null,
    shippingId,
    shippingCost,
    shippingType,
    customerId,
    stripeToken,
    stripeEmail,
    next
  ) {
    stripePayment.customers.create({
      email: stripeEmail,
      source: stripeToken
    })
      .then(customer => stripePayment.charges.create({
        amount: finalPrice,
        currency: 'usd',
        customer: customer.id
      }))
      .then((payment) => {
        Mailer.sendOrderConfirmation(customerId, shippingCost, shippingType);
        Customer.findOne({
          where: {
            id: customerId
          }
        })
          .then((user) => {
            Order.create({
              total_amount: finalPrice / 100,
              status: 1,
              comments: description,
              customer_id: user.id,
              auth_code: req.body.stripeToken || null,
              reference: payment.balance_transaction,
              shipping_id: shippingId,
            });
          })
          .then(() => {
            CheckoutController.clearShoppingCart(req, res, next);
            return res.status(200).json({ message: 'Payment Successful' });
          })
          .catch(next)
          .catch(next)
          .catch(next);
      })
      .catch(next);
  }

  /**
   *
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next
   *
   * @returns {*} returns order object
   */
  static checkout(req, res, next) {
    const { shippingId, stripeToken, stripeEmail } = req.body;

    Shipping.findByPk(shippingId).then((shipping) => {
      if (!shipping) {
        return res.status(400).json({
          message: 'The shipping id provided is invalid, please check again'
        });
      }
      const shippingCost = parseFloat(shipping.shipping_cost);
      const shippingType = shipping.shipping_type;
      ShoppingCart.findAll({
        include: [{
          model: Product,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }],
        where: {
          customer_id: req.decoded.customerId
        }
      }).then((response) => {
        const price = [];
        const discount = [];
        const { customerId } = req.decoded;
        response.forEach((item) => {
          const currentprice = parseFloat(item.Product.price * item.quantity);
          price.push(currentprice);
          const currentDiscount = parseFloat(item.Product.discounted_price);
          discount.push(currentDiscount);
        });
        const totalPrice = price.reduce((prev, curr) => prev + curr);
        const totalDiscount = discount.reduce((prev, curr) => prev + curr);
        const finalPrice = Math.round((((totalPrice + shippingCost - totalDiscount) * 100)));
        const description = 'Payment for your order on tshirt shop';
        return CheckoutController.checkoutQuery(
          req,
          res,
          finalPrice,
          description, shippingId, shippingCost, shippingType, customerId, stripeToken, stripeEmail
        );
      }).catch(next);
    }).catch(next);
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   *
   * @returns {*} empty cart object
   */
  static clearShoppingCart(req, res, next) {
    ShoppingCart.destroy({
      where: {
        customer_id: req.decoded.customerId
      },
      force: true
    }).catch(next);
  }

  /**
   *
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next next function
   *
   * @returns {*} returns list of shipping region with shipping option
   */
  static getShippingRegion(req, res, next) {
    ShippingRegion.findAndCountAll({
      attributes: {
        exclude: ['shipping_region_id']
      },
      include: [{
        model: Shipping,
      }]
    })
      .then((response) => {
        if (response.rows < 1) {
          return res.status(200).json({
            message: 'No shipping Region in the database at the moment'
          });
        }
        return res.status(200).json({
          response
        });
      }).catch(next);
  }
}

export default CheckoutController;
