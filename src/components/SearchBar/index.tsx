import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { VscChromeClose, VscSettings } from 'react-icons/vsc'

import { AdvancedSearchContext } from '../../contexts/AdvancedSearchContext'
import { classNames } from '../../utils/classNames'

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false
})

export function SearchBar () {
  const [query, setQuery] = useState('')
  const {
    advancedSearchSettings,
    totalSelectedSettings,
    handleOpenAdvancedSearchModal
  } = useContext(AdvancedSearchContext)

  return (
    <>
      <form
        action=""
        className="flex flex-col justify-center items-center px-2.5 space-y-8 w-full md:px-1"
      >
        <label
          htmlFor="search"
          className={classNames(
            'flex relative items-center py-3 px-4 space-x-1 w-full rounded-full',
            'border border-slate-200 focus-within:shadow-md hover:shadow-md md:w-[38rem]',
            'dark:focus-within:bg-slate-800 dark:hover:bg-slate-800 dark:border-slate-600'
          )}
        >
          <AiOutlineSearch
            size="20"
            className="mr-2.5 w-8 min-w-[20px] text-slate-400"
          />
          <input
            type="text"
            className={classNames(
              'w-full bg-transparent border-transparent focus:border-transparent',
              'dark:text-slate-200 focus:ring-0'
            )}
            id="search"
            title="Search"
            value={query}
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="flex justify-end items-center !mr-1 w-[5.75rem]">
            {query.length > 0 && (
              <>
                <VscChromeClose
                  size="22"
                  data-tip
                  data-for="clear-tip"
                  className="min-w-[22px] text-slate-600 dark:text-slate-400 focus:outline-none cursor-pointer"
                  onClick={() => setQuery('')}
                />

                <ReactTooltip
                  id="clear-tip"
                  place="bottom"
                  effect="solid"
                  className={classNames(
                    '!py-[0.3rem] !px-2 !mt-5 whitespace-nowrap !rounded-sm',
                    '!text-slate-100 !bg-slate-900 dark:!bg-slate-800',
                    'after:!border-b-slate-900 dark:after:!border-b-slate-800'
                  )}
                >
                  Clear
                </ReactTooltip>

                <span className="p-[0.5px] !mx-4 h-6 bg-slate-200 dark:bg-slate-700"></span>
              </>
            )}

            <button
              type="button"
              className="flex relative cursor-pointer"
              onClick={handleOpenAdvancedSearchModal}
            >
              <VscSettings
                size="22"
                data-tip
                data-for="setting-tip"
                className="relative min-w-[22px] text-slate-600 dark:text-slate-400 focus:outline-none"
              />
              <span
                className={classNames(
                  'flex absolute right-0 justify-center items-center -m-2.5 w-4 h-4',
                  'text-xs font-medium text-white bg-[#FF0100] rounded-full',
                  totalSelectedSettings(advancedSearchSettings) ? '' : 'hidden'
                )}
              >
                {totalSelectedSettings(advancedSearchSettings)}
              </span>
            </button>

            <ReactTooltip
              id="setting-tip"
              place="bottom"
              effect="solid"
              className={classNames(
                '!py-[0.3rem] !px-2 !mt-5 whitespace-nowrap !rounded-sm',
                '!text-slate-100 !bg-slate-900 dark:!bg-slate-800',
                'after:!border-b-slate-900 dark:after:!border-b-slate-800'
              )}
            >
              Advanced search
            </ReactTooltip>
          </div>
        </label>
        <div
          className={classNames(
            'flex flex-row justify-center items-center whitespace-nowrap',
            'space-y-0 space-x-3 xs:flex-col xs:space-y-3 xs:space-x-0'
          )}
        >
          <button
            type="submit"
            className={classNames(
              'py-2 px-4 text-sm font-normal text-slate-900 bg-[#F8F9FA]',
              'rounded-sm hover:ring-1 hover:ring-slate-300 hover:shadow-md',
              'dark:text-slate-100 dark:hover:text-slate-200 dark:hover:ring-slate-600',
              'dark:bg-gray-800 dark:hover:bg-gray-900 dark:duration-300 dark:transform'
            )}
          >
            YouTube Search
          </button>
          <button
            type="submit"
            className={classNames(
              'py-2 px-4 text-sm font-normal text-slate-900 bg-[#F8F9FA]',
              'rounded-sm hover:ring-1 hover:ring-slate-300 hover:shadow-md',
              'dark:text-slate-100 dark:hover:text-slate-200 dark:hover:ring-slate-600',
              'dark:bg-gray-800 dark:hover:bg-gray-900 dark:duration-300 dark:transform'
            )}
          >
            I&apos;m Feeling Lucky
          </button>
        </div>
      </form>
    </>
  )
}
