import Image from 'next/image'
import { useContext } from 'react'

import { DarkModeContext } from '../../contexts/DarkModeContext'

export function YouTubeLogo () {
  const { darkMode } = useContext(DarkModeContext)

  return (
    <>
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
    </>
  )
}
