import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.scss'

// https://developers.google.com/youtube/v3/docs/search/list
// https://www.googleapis.com/youtube/v3/search/?order=date&regionCode=US&type&channel&part=snippet&maxResults=50&key=${process.env.YOUTUBE_API_KEY}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>YouTube Advanced Search</title>
        <meta name="description" content="YouTube Advanced Search" />
      </Head>

      <main className={styles.main}>
        <div>
          <Image src="/boilerplate.svg" alt="Favicon" width={64} height={64} />{' '}
          Hello, <a href="#">boilerplate!</a>
        </div>
      </main>
    </>
  )
}

export default Home
