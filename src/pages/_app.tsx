import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import Modal from 'react-modal'

import { AdvancedSearchProvider } from '../contexts/AdvancedSearchContext'
import { DarkModeProvider } from '../contexts/DarkModeContext'

Modal.setAppElement('#root')

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider>
      <AdvancedSearchProvider>
        <Component {...pageProps} />
      </AdvancedSearchProvider>
    </DarkModeProvider>
  )
}

export default MyApp
