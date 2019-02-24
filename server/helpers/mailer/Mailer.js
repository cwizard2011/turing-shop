import transporter from './config';
import db from '../../database/models';

const {
  ShoppingCart,
  Product,
  Customer
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
   *
   * @returns {*} send order confirmation email
   */
  static async sendOrderConfirmation(customerId) {
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
        region,
        country
      } = response[0].Customer;
      const address1 = response[0].Customer.address_1;
      const postalCode = response[0].Customer.postal_code;
      const priceArray = [];
      const discountArray = [];
      response.forEach((item) => {
        priceArray.push(parseFloat(item.Product.price));
        discountArray.push(parseFloat(item.Product.discountedPrice));
      });
      const totalPrice = priceArray.reduce((prev, curr) => prev + curr);
      const totalDiscount = discountArray.reduce((prev, curr) => prev + curr);
      const finalPrice = totalPrice - totalDiscount;
      const messageColumn = response.forEach(item => (
        `<tr>
        <td>${item.Product.name}</td>
        <td>${item.quantity}</td>
        <td>${item.Product.price}</td>
        </tr>`
      ));
      const subject = 'Order confirmation';
      const message = `
      <p>Dear ${name}, below is the summary of your order excluding shipping charges</p>
      <table>
      ${messageColumn}
      </table>
      <p>
      Total Price: ${totalPrice},
      <span>Discount: ${totalDiscount}</span>,
      <span>Final Charge: ${finalPrice}</span>
      </p>
      <p>Shipping Address: ${address1}, ${city}, ${region}, ${country}, ${postalCode}</p>
      `;
      Mailer.emailSender(email, subject, message);
    });
  }
}

export default Mailer;
