import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { VscChromeClose, VscSettings } from 'react-icons/vsc'

import { AdvancedSearchContext } from '../../contexts/AdvancedSearchContext'
import { classNames } from '../../utils/classNames'
import { getYoutubeUrl } from '../../utils/getYoutubeUrl'

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false
})

export function SearchBar ({ minified }: { minified?: boolean }) {
  const router = useRouter()
  const { q } = router.query
  const [query, setQuery] = useState('')
  const {
    advancedSearchSettings,
    getQueryParams,
    totalSelectedSettings,
    handleOpenAdvancedSearchModal
  } = useContext(AdvancedSearchContext)

  useEffect(() => {
    setQuery((q as string) || '')
  }, [q])

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!query) return

    router.push(`/search?${getQueryParams(query)}`)
  }

  async function handleImFeelingLucky () {
    if (!query) return

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}?${getQueryParams(query)}`
    )
    const data = await res.json()

    router.push(getYoutubeUrl(data.items[0].id))
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center space-y-8 w-full max-w-[30rem] sm:max-w-[38rem]"
      >
        <label
          htmlFor="search"
          className={classNames(
            'flex relative items-center py-3 px-4 space-x-1 w-full rounded-full',
            'bg-white border border-slate-200 focus-within:shadow-md hover:shadow-md',
            'dark:bg-slate-900 dark:focus-within:bg-slate-800 dark:hover:bg-slate-800 dark:border-slate-600'
          )}
        >
          {!minified && (
            <AiOutlineSearch
              size="20"
              className="mr-2.5 w-8 min-w-[20px] text-slate-400"
            />
          )}
          <input
            type="text"
            className={classNames(
              'w-full bg-transparent border-transparent focus:border-transparent',
              'dark:text-slate-200 focus:ring-0',
              minified ? 'pl-2' : ''
            )}
            id="search"
            title="Search"
            value={query}
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
          />

          <div
            className={classNames(
              'flex justify-end items-center !mr-1',
              minified ? 'w-[7.5rem]' : 'w-[5.75rem]'
            )}
          >
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
                  'flex absolute right-0 justify-center items-center -m-2.5 w-[1.125rem] h-[1.125rem]',
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

            {minified && (
              <button type="submit" className="flex relative cursor-pointer">
                <AiOutlineSearch
                  size="22"
                  className="relative ml-4 min-w-[22px] text-slate-600 dark:text-slate-400 focus:outline-none"
                />
              </button>
            )}
          </div>
        </label>
        {!minified && (
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
              onClick={handleImFeelingLucky}
              type="button"
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
        )}
      </form>
    </>
  )
}
