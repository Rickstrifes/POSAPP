import React, { useState } from 'react';
import styles from './index.module.css';
import 'font-awesome/css/font-awesome.min.css';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import Login_validate from '../../../lib/Validate_Login';

const Login = () => {
  const [show, setShow] = useState(false);

  // Google Handler function
  async function handleGoogleSignin() {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  }
  //formik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: Login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    console.log(values);
  }

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h2 className={styles.h2}>POS Login</h2>
        <div className={styles['label-input']}>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              placeholder="email"
              name="email"
              required
              className={styles.input}
              // onChange={formik.handleChange} bisa gini atau getfieldprops seperti dibawah lebih clean
              // value={formik.values.email}
              {...formik.getFieldProps('email')}
            />
            <span className={styles.iconWrapper}>
              <i className="fa fa-envelope-o"></i>
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : ''}
        </div>
        <div className={styles['label-input']}>
          <div className={styles.inputWrapper}>
            <input
              type={`${show ? 'text' : 'password'}`}
              placeholder="Password"
              name="password"
              required
              className={styles.input}
              // onChange={formik.handleChange} bisa gini atau getfieldprops seperti dibawah lebih clean
              // value={formik.values.password}
              {...formik.getFieldProps('password')}
            />
            <span className={styles.iconWrapper} onClick={handleClick}>
              <i className="fa fa-eye"></i>
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : ''}
        </div>
        <div className={styles.inputbutton}>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
        <div className={styles.inputbutton}>
          <button type="submit" onClick={handleGoogleSignin} className={styles.button}>
            Sign In with Google
          </button>
        </div>
        <p>
          Don&apos;t have an account yet ?{' '}
          <Link href={'/register'} style={{ color: '#2f80ec' }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
