import type { NextPage } from 'next'
import Head from 'next/head'

import { AdvancedSearchModal } from '../components/AdvancedSearchModal'
import { DarkModeButton } from '../components/DarkModeButton'
import { SearchBar } from '../components/SearchBar'
import { YouTubeLogo } from '../components/YouTubeLogo'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>YouTube - Advanced Search</title>
        <meta name="description" content="Advanced YouTube Search" />
      </Head>

      <main className="container flex flex-col justify-center items-center mx-auto h-screen">
        <div className="fixed top-0 right-0 mt-6 mr-6">
          <DarkModeButton />
        </div>

        <div className="px-14 mb-12 w-full max-w-[20rem] sm:max-w-[24rem]">
          <YouTubeLogo />
        </div>

        <div className="flex justify-center px-4 w-full">
          <SearchBar />
          <AdvancedSearchModal />
        </div>
      </main>
    </>
  )
}

export default Home
