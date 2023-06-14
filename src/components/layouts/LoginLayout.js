import React from 'react';
import styles from './login.module.css';

const LoginLayout = ({ children }) => {
  return (
    <main className={styles.layout}>
      <section className={styles.content}>
        {children}
      </section>
    </main>
  )
}

export default LoginLayout;