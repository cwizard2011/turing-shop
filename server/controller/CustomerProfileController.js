import db from '../database/models';

const {
  Customer,
  ShippingRegion,
  Shipping
} = db;

/**
 * @class UpdateCustomerProfile
 */
class CustomerProfileController {
  /**
     *
     * @param {object} req request object
     * @param {object} res response object
     * @param {function} next calls the next function/middleware
     *
     * @returns {object} returns user object
     */
  static updateProfile(req, res, next) {
    const {
      address1,
      address2,
      city,
      region,
      postalCode,
      country,
      dayPhone,
      evePhone,
      mobPhone,
      shippingRegionId,
    } = req.body.user;
    Customer.findByPk(req.decoded.customerId).then((customer) => {
      if (!customer) {
        return res.status(404).json({
          message: 'Customer with this id does not exist'
        });
      }
      if (customer.customer_id !== req.decoded.customerId) {
        return res.status(403).json({
          message: 'Access Denied! You can\'t edit another user\'s profile'
        });
      }
      customer.update({
        address_1: address1 || customer.address_1,
        address_2: address2 || customer.address_2,
        city: city || customer.city,
        region: region || customer.region,
        postal_code: postalCode || customer.postal_code,
        country: country || customer.country,
        day_phone: dayPhone || customer.dayPhone,
        eve_phone: evePhone || customer.eve_phone,
        mob_phone: mobPhone || customer.mob_phone,
        shipping_region_id: shippingRegionId || customer.shipping_region_id
      });
      return res.status(200).json({
        profile: {
          name: customer.name,
          email: customer.email,
        },
        message: 'Profile successfully updated'
      });
    }).catch(next);
  }

  /**
   * @description gets customer information on checkout
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next calls next function or middleware
   *
   * @returns {object} returns user object
   */
  static getUserProfile(req, res, next) {
    Customer.findByPk(req.decoded.customerId, {
      attributes: {
        exclude: ['password', 'credit_card']
      },
      include: [{
        model: ShippingRegion,
        attributes: {
          exclude: ['shipping_region_id']
        },
        include: [{
          model: Shipping
        }]
      }]
    }).then(user => res.status(200).json({
      user
    })).catch(next);
  }
}

export default CustomerProfileController;
