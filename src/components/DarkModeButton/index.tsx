import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

import { DarkModeContext } from '../../contexts/DarkModeContext'
import { classNames } from '../../utils/classNames'

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false
})

export function DarkModeButton () {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)

  return (
    <>
      <button
        type="button"
        data-tip
        data-for="dark-tip"
        className={classNames(
          'p-2.5 rounded-lg focus:ring-2',
          'ring-slate-300 dark:ring-slate-700',
          'bg-slate-100 dark:bg-slate-800',
          'text-slate-400 dark:text-slate-100',
          'hover:bg-slate-200 dark:hover:bg-slate-700',
          'duration-300 transform'
        )}
        onClick={toggleDarkMode}
      >
        {darkMode ? <BsFillSunFill size="22" /> : <BsFillMoonFill size="22" />}
      </button>

      <ReactTooltip
        id="dark-tip"
        place="bottom"
        effect="solid"
        className={classNames(
          '!py-[0.3rem] !px-2 !mt-5 whitespace-nowrap !rounded-sm',
          '!text-slate-100 !bg-slate-900 dark:!bg-slate-800',
          'after:!border-b-slate-900 dark:after:!border-b-slate-800'
        )}
      >
        Toggle dark mode
      </ReactTooltip>
    </>
  )
}
