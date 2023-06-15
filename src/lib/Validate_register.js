import emailValidation from '@/utility/email_validation.js'
import passwordValidation from '@/utility/password_validation.js'

export default function Validate_register(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.trim() === "") {
    errors.username = 'Invalid Username..!';
  }

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

  //validate confirm password
  if (!values.cpassword) {
    errors.cpassword = 'Required';
  } else if (values.password !== values.cpassword) {
    errors.cpassword = 'Password not match';
  }

  return errors;
}
