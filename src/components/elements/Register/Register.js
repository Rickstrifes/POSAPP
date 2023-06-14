import React, { useState } from 'react';
import styles from './register.module.css';
import 'font-awesome/css/font-awesome.min.css';
import Link from 'next/link';
import { useFormik } from 'formik';
import Validate_register from '../../../lib/Validate_register';

const Register = () => {
  const [show, setShow] = useState({ password: false, cpassword: false });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: Validate_register,
    onSubmit,
  });

  async function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h2 className={styles.h2}>POS Register</h2>
        <div className={styles['label-input']}>
          <div className={styles.inputWrapper}>
            <input 
            type="text" 
            placeholder="username" 
            name="username" 
            className={styles.input} 
            {...formik.getFieldProps('username')}
              />
            <span className={styles.iconWrapper}>
              <i className="fa fa-user-o"></i>
            </span>
          </div>
          {formik.errors.username && formik.touched.username ? <span>{formik.errors.username}</span> : ''}
          <div className={styles.inputWrapper}>
            <input 
            type="email" 
            placeholder="email" 
            name="email" 
            className={styles.input} 
            {...formik.getFieldProps('email')} />
            <span className={styles.iconWrapper}>
              <i className="fa fa-envelope-o"></i>
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : ''}
        </div>
        <div className={styles['label-input']}>
          <div className={styles.inputWrapper}>
            <input 
            type={`${show.password ? 'text' : 'password'}`} 
            placeholder="password" 
            name="password" 
            className={styles.input} 
            {...formik.getFieldProps('password')} 
            />
            <span className={styles.iconWrapper} 
              onClick={() => 
              setShow({ ...show, password: !show.password })}
              >
              <i className="fa fa-eye"></i>
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : ''}
        </div>
        <div className={styles['label-input']}>
          <div className={styles.inputWrapper}>
            <input 
              type={`${show.cpassword ? 'text' : 'password'}`} 
              placeholder="confirm password" 
              name="cpassword" 
              className={styles.input} 
              {...formik.getFieldProps('cpassword')} 
              />
            <span 
              className={styles.iconWrapper} 
              onClick={() => 
              setShow({ ...show, cpassword: !show.cpassword })}>
              <i className="fa fa-eye"></i>
            </span>
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? <span>{formik.errors.cpassword}</span> : ''}
        </div>
        <div className={styles.inputbutton}>
          <Link href={'/login'}>
            <button 
              className={styles.button}>
              Sign Up
            </button>
          </Link>
        </div>
        <p>
          Have an account ?{' '}
          <Link href={'/login'} style={{ color: '#2f80ec' }}>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
