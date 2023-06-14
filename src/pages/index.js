import React, { useEffect, useState } from 'react';
import Layout from '@/components/layouts/Layout';
import api from '@/api';
import ProductList from '@/components/elements/ProductList/ProductList';
import Cart from '@/components/elements/Cart/Cart';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import Head from 'next/head';
import { getSession, useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <div>
      <Head>
        <title>HOME</title>
      </Head>
      {session ? User({ session, handleSignOut }) : Guest()}
    </div>
  );
}

function Guest() {
  return (
    <main>
      <h3>Guest Homepage</h3>

      <div>
        <Link href={'/login'}>
          <span>Silahkan Login Untuk Menuju Home Page</span>
        </Link>
      </div>
    </main>
  );
}

function User({ session, handleSignOut }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await api.get('/products');
      const data = await response.data.payload;
      setProducts(data);
    };

    fetchProduct();
  }, []);

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10em',
        }}
      >
        <h1>{session.user.name}</h1>
        <h1>{session.user.email}</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className={styles.home}>
        <ProductList products={products} />
        <Cart />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
