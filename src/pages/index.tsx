import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'

import { AdvancedSearchModal } from '../components/AdvancedSearchModal'
import { DarkModeButton } from '../components/DarkModeButton'
import { SearchBar } from '../components/SearchBar'
import { DarkModeContext } from '../contexts/DarkModeContext'

const Home: NextPage = () => {
  const { darkMode } = useContext(DarkModeContext)

  return (
    <>
      <Head>
        <title>YouTube - Advanced Search</title>
        <meta name="description" content="Advanced YouTube search." />
      </Head>

      <main className="container flex flex-col justify-center items-center mx-auto h-screen">
        <div className="fixed top-0 right-0 mt-6 mr-6">
          <DarkModeButton />
        </div>
        <div className="px-14 mb-10 w-full max-w-[20rem] sm:max-w-[24rem]">
          {darkMode ? (
            <Image
              src="/yt_logo_rgb_dark.png"
              alt="YouTube"
              title="YouTube"
              width={280}
              height={62}
              layout="responsive"
              priority
            />
          ) : (
            <Image
              src="/yt_logo_rgb_light.png"
              alt="YouTube"
              title="YouTube"
              width={280}
              height={62}
              layout="responsive"
              priority
            />
          )}
        </div>

        <SearchBar />

        <AdvancedSearchModal />
      </main>
    </>
  )
}

export default Home
