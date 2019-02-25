import stripe from 'stripe';
import db from '../database/models';
import Mailer from '../helpers/mailer/Mailer';
import clearCart from '../helpers/clearCart';

const {
  Customer,
  Order,
  ShoppingCart,
  Product,
  Shipping,
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
     * @param {*} shippingType,
     * @param {*} customerId
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
    next
  ) {
    stripePayment.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
      .then(customer => stripePayment.charges.create({
        amount: finalPrice,
        currency: 'eur',
        customer: customer.id
      }))
      .then((payment) => {
        Customer.findOne({
          where: {
            email: payment.source.name
          }
        })
          .then(user => Order.create({
            total_amount: finalPrice,
            status: 1,
            comments: description,
            customer_id: user.id,
            auth_code: req.body.stripeToken || null,
            reference: payment.balance_transaction,
            shipping_id: shippingId,
          }))
          .then(() => {
            Mailer.sendOrderConfirmation(customerId, shippingCost, shippingType);
            clearCart(customerId);
            return res.render('Payment Successful');
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
    const { shippingId } = req.body;

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
          const currentprice = parseFloat(item.Product.price);
          price.push(currentprice);
          const currentDiscount = parseFloat(item.Product.discounted_price);
          discount.push(currentDiscount);
        });
        const totalPrice = price.reduce((prev, curr) => prev + curr);
        const totalDiscount = discount.reduce((prev, curr) => prev + curr);
        const finalPrice = (totalPrice - totalDiscount) + shippingCost;
        const description = 'Payment for your order on turing store';
        return CheckoutController.checkoutQuery(
          req, res, finalPrice, description, shippingId, shippingCost, shippingType, customerId
        );
      }).catch(next);
    }).catch(next);
  }
}

export default CheckoutController;
