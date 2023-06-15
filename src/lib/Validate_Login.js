import emailValidation from '@/utility/email_validation.js'
import passwordValidation from '@/utility/password_validation.js'

export default function Login_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (emailValidation(values.email)) {
    errors.email = 'Invalid email address';
  }

  //validation for password
  if (!values.password) {
    errors.password = 'Required';
  } else if (passwordValidation(values.password)) {
    errors.password = 'Must be greather than 8 and less then 20 characters long';
  }

  return errors;
}
