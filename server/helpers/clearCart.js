import db from '../database/models';

const { ShoppingCart } = db;

const clearCart = (req, res, customerId, next) => {
  ShoppingCart.findAll({
    where: {
      customer_id: customerId
    }
  }).then((items) => {
    items.forEach(item => item.destroy());
  }).catch(next);
};

export default clearCart;
