import transporter from './config';
import db from '../../database/models';

const {
  ShoppingCart,
  Product,
  Customer,
} = db;


/**
 * @class
 * @description Mailer for sending email on sucessful order
 */
class Mailer {
  /**
   *
   * @param {String} emailAddress Email address of the customer
   * @param {String} mailSubject Subject of the email
   * @param {String} mailBody body of the email
   *
   * @returns {*} Sends email
   */
  static async emailSender(emailAddress, mailSubject, mailBody) {
    const emailOptions = {
      from: 'Turing Store',
      to: emailAddress,
      subject: mailSubject,
      html: `<h3 style="background: white;padding: .5em;">Turing Store</h3>
      <div style="padding: .5em;">${mailBody}</div>
      <p style="padding: .5em;"><b>**Note if you didnt place this order,
      please reply to this email with your complaint</p>`,
    };

    return transporter.sendMail(emailOptions, (err) => {
      if (err) {
        return false;
      }
      return true;
    });
  }

  /**
   *
   * @param {*} customerId Id of the customer placing the order
   * @param {*} shippingCost
   * @param {*} shippingType
   * @returns {*} send order confirmation email
   */
  static async sendOrderConfirmation(customerId, shippingCost, shippingType) {
    ShoppingCart.findAll({
      include: [{
        model: Product
      }, {
        model: Customer,
        attributes: {
          exclude: ['password', 'credit_card', 'role', 'createdAt', 'updatedAt']
        }
      }],
      where: {
        customer_id: customerId
      }
    }).then((response) => {
      const {
        name,
        email,
        city,
        country
      } = response[0].Customer;
      const address1 = response[0].Customer.address_1;
      const postalCode = response[0].Customer.postal_code;
      const priceArray = [];
      const discountArray = [];
      response.forEach((item) => {
        priceArray.push(parseFloat(item.Product.price * item.quantity));
        discountArray.push(parseFloat(item.Product.discounted_price));
      });
      const orderTableColumn = response.reduce((a, b) => `${a}<tr>
      <td style="border: 1px solid #ddd; padding: 8px;">${b.Product.name}</a></td>
      <td style="border: 1px solid #ddd; padding: 8px;">${b.quantity}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">$ 
      ${Math.round((b.Product.price * b.quantity * 100) / 100).toFixed(2)}</td></tr>`, '');
      const totalPrice = priceArray.reduce((prev, curr) => prev + curr);
      const totalDiscount = discountArray.reduce((prev, curr) => prev + curr);
      const finalPrice = Math.round(
        (((totalPrice - totalDiscount) + shippingCost) * 100) / 100
      ).toFixed(2);

      const subject = 'Order confirmation';
      const message = `
      <p>Dear ${name}, below is the summary of your order including shipping charges</p>
      <table style="border-collapse: collapse;">
      <thead style="background-color: #6EB2FB; color:white">
      <th style="border: 1px solid #ddd; padding: 8px;">Item Name</th>
      <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
      <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
      </thead>
      ${orderTableColumn}
      </table>
      <p><b>Shipping:</b> ${shippingType} <span><b>Cost:</b> $ ${shippingCost}</span></p>
      <p>
      <b>Item Total:</b>$ ${Math.round((totalPrice * 100) / 100).toFixed(2)},
      <span><b>Discount:</b>$ ${Math.round((totalDiscount * 100) / 100).toFixed(2)}</span>,
      <span><b>Final Charge:</b>$ ${finalPrice}</span>
      </p>
      <p><b>Shipping Address:</b> ${address1}, ${city}, ${country}, ${postalCode}</p>
      `;
      Mailer.emailSender(email, subject, message);
    });
  }
}

export default Mailer;
