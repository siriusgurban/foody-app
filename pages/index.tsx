import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import HeaderAdmin from '@/shared/components/headerAdmin'
import ClientHeader from '@/shared/components/clientHeader'
import { Box } from '@chakra-ui/react'

const Home: NextPage = () => {
  // const handleUpload = (e: any) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   axios({
  //     method: "POST",
  //     url: "/api/uploads",
  //     headers: {
  //       "Content-Type": "multi-part",
  //     },
  //     data: formData,
  //   });
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>Foody | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className="max-w-[1440px] mx-auto">
        <header>
          <ClientHeader />
        </header>
        <main></main>
      </Box>
    </div>
  )
}

export default Home
