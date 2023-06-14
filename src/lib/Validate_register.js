export default function Validate_register(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.trim() === "") {
    errors.username = 'Invalid Username..!';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  //validation for password
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Must be greather than 8 and less then 20 characters long';
  } else if (values.password.trim() === "") {
    errors.password = 'Invalid Password';
  }

  //validate confirm password
  if (!values.cpassword) {
    errors.cpassword = 'Required';
  } else if (values.password !== values.cpassword) {
    errors.cpassword = 'Password not match';
  } else if (values.cpassword.trim() === "") {
    errors.cpassword = 'Invalid Confirm Passsword';
  }

  return errors;
}
