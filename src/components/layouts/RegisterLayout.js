import React from 'react';
import styles from './register.module.css';

const RegisterLayout = ({ children }) => {
  return (
    <main className={styles.layout}>
      <section className={styles.content}>
        {children}
      </section>
    </main>
  )
}

export default RegisterLayout;