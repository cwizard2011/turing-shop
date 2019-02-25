import Validator from 'validatorjs';

/**
 * @class UserInputValidation
 */
class UserInputValidation {
  /**
   * validate user input on signUp
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   *
   * @return {void}
   */
  static signUpInputValidation(req, res, next) {
    const {
      email,
      firstname,
      lastname,
      password,
      password_confirmation // eslint-disable-line
    } = req.body.user;
    const data = {
      email,
      firstname,
      lastname,
      password,
      password_confirmation // eslint-disable-line
    };
    const rules = {
      firstname: ['string', 'min:2', 'max:40'],
      lastname: ['string', 'min:2', 'max:40'],
      email: 'required|string|email',
      password: 'required|min:8|max:40|confirmed',
      password_confirmation: 'required'
    };
    const message = {
      'string.firstname': 'This :attribute has to be a string value.',
      'string.lastname': 'This :attribute has to be a string value.',
      'min.firstname':
          'This :attribute is too short. Min length is :min characters.',
      'min.lastname':
          'This :attribute is too short. Min length is :min characters.',
      'max.firstname':
          'This :attribute is too long. Max length is :max characters.',
      'max.lastname':
          'This :attribute is too long. Max length is :max characters.',
      'regex.firstname':
          'The :attribute you have entered contains invalid character(s).',
      'regex.lastname':
          'The :attribute you have entered contains invalid character(s).',
      'required.email':
          'Please you have to specify a valid :attribute so we can contact you.',
      'string.email': 'Sorry, the :attribute has to be a string value.',
      'email.email': 'Please enter a valid :attribute address.',
      'required.password': ':attribute field is required.',
      'min.password':
          'The :attribute is too short. Min length is :min characters.',
      'max.password':
          'The :attribute is too long. Max length is :max characters.',
      'confirmed.password': 'Password Mismatch.'
    };
    const validation = new Validator(data, rules, message);
    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      errors: validation.errors.all()
    });
  }

  /**
   * validate user input on signUp
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   *
   * @return {void}
   */
  static loginInputValidation(req, res, next) {
    const { email, password } = req.body.user;
    const data = {
      email,
      password
    };
    const rules = {
      email: 'required',
      password: 'required'
    };
    const message = {
      'required.email': 'This :attribute is a required field.',
      'required.password': 'This :attribute is a required field.'
    };
    const validation = new Validator(data, rules, message);
    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      errors: validation.errors.all()
    });
  }

  /**
   * @description validates users input on profile update
   *
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next
   *
   * @returns {function} calls next function/middleware
   */
  static profileUpdateValidation(req, res, next) {
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

    const data = {
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
    };
    Validator.register(
      'positiveInt', value => value > 0,
      'The :attribute must be a positive integer',
    );
    const rules = {
      address1: 'string|max:99',
      address2: 'string|max:99',
      city: 'string|max:30',
      region: 'string|max:30',
      postalCode: 'string|min:5|max:6',
      country: 'string|min:3|max:30',
      dayPhone: 'integer|positiveInt|min:7|max:18',
      evePhone: 'integer|positiveInt|min:7|max:18',
      mobPhone: 'integer|positiveInt|min:7|max:18',
      shippingRegionId: 'integer|positiveInt'
    };
    const validation = new Validator(data, rules);
    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      errors: validation.errors.all()
    });
  }
}
export default UserInputValidation;
