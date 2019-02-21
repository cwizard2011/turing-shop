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
    const validation = new Validator(
      {
        firstname,
        lastname,
        email,
        password,
        password_confirmation
      },
      {
        firstname: ['string', 'min:2', 'max:40'],
        lastname: ['string', 'min:2', 'max:40'],
        email: 'required|string|email',
        password: 'required|min:8|max:40|confirmed',
        password_confirmation: 'required'
      },
      {
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
      }
    );
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
    const validation = new Validator(
      {
        email,
        password
      },
      {
        email: 'required',
        password: 'required'
      },
      {
        'required.email': 'This :attribute is a required field.',
        'required.password': 'This :attribute is a required field.'
      }
    );
    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      errors: validation.errors.all()
    });
  }
}
export default UserInputValidation;
