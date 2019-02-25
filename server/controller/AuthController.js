import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../database/models/index';

dotenv.config();
const secret = process.env.SECRET_KEY;
const salt = bcrypt.genSaltSync(10);

const { Customer } = db;

/**
 * Class representing users
 */
class AuthController {
  /**
   * Register a user and return a JWT token
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - Next function
   * @returns {token} token - JWT token
   */
  static createCustomer(req, res, next) {
    const {
      firstname, lastname, password
    } = req.body.user;
    let { email } = req.body.user;
    email = email.toLowerCase();

    Customer.findOne({
      where: {
        email
      },
    }).then((existingCustomer) => {
      if (existingCustomer) {
        return res.status(409).json({
          message: 'Email is already in use by another Customer.'
        });
      }
      const hashedPassword = bcrypt.hashSync(password, salt);
      Customer.create({
        name: `${firstname} ${lastname}`,
        email,
        password: hashedPassword,
      })
        .then((customer) => {
          const token = jwt.sign(
            {
              customerId: customer.id,
              email: customer.email,
              role: customer.role,
            }, secret, { expiresIn: '24h' }
          );
          res.status(201).json({
            user: { ...customer.toAuthJSON(), token },
            message: 'Registration successful',
          });
        })
        .catch(next);
    });
  }

  /**
   * Sign In a user and return a JWT token
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - Next function
   * @returns {token} token - JWT token
   */
  static loginCustomer(req, res, next) {
    const { password } = req.body.user;
    let { email } = req.body.user;
    email = email.toLowerCase();
    Customer.findOne({
      where: {
        email
      },
    }).then((customer) => {
      if (customer) {
        if (bcrypt.compareSync(password, customer.password)) {
          const token = jwt.sign({
            customerId: customer.id,
            email: customer.email,
            role: customer.role,
          }, secret, { expiresIn: '24h' });
          return res.status(200).json({
            message: 'Congratulations, you are now logged in.',
            user: {
              email: customer.email,
              name: customer.name,
              token
            }
          });
        }
        return res.status(400).json({
          message: 'Email or password does not match.'
        });
      }
      return res.status(404).json({
        message: 'You are yet to register. Kindly sign up.'
      });
    }).catch(next);
  }
}
export default AuthController;
