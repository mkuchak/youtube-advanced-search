import 'react-datepicker/dist/react-datepicker.css'

import { useContext } from 'react'
import DatePicker from 'react-datepicker'
import { VscChromeClose } from 'react-icons/vsc'
import Modal from 'react-modal'

import { AdvancedSearchContext } from '../../contexts/AdvancedSearchContext'
import { classNames } from '../../utils/classNames'
import categories from './categoryList.json'
import countries from './countryList.json'

export function AdvancedSearchModal () {
  const {
    advancedSearchSettings,
    isAdvancedSearchModalOpen,
    handleSelectOption,
    handleDateChange,
    handleSelectOne,
    handleSelectMany,
    handleSelectManyToEntries,
    handleResetSettings,
    handleCloseAdvancedSearchModal
  } = useContext(AdvancedSearchContext)

  return (
    <Modal
      isOpen={isAdvancedSearchModalOpen}
      onRequestClose={handleCloseAdvancedSearchModal}
      shouldFocusAfterRender={true}
      shouldReturnFocusAfterClose={false}
      preventScroll={false}
      contentLabel="Advanced Search"
      overlayClassName={classNames(
        'flex overflow-x-hidden overflow-y-auto fixed justify-center items-center',
        'top-0 right-0 bottom-0 left-0 z-50 py-8 w-screen h-screen bg-[#515b6d22]'
      )}
      className={classNames(
        'flex relative flex-col justify-center items-center my-auto w-full',
        'p-3 mx-2 max-w-[600px] bg-white rounded-sm outline-none shadow-lg',
        'dark:text-slate-200 dark:bg-slate-800'
      )}
    >
      <VscChromeClose
        size="22"
        className={classNames(
          'absolute top-4 right-4 w-5 min-w-[18px] h-5 bg-transparent border-none',
          'text-slate-600 dark:text-slate-400 focus:outline-none cursor-pointer'
        )}
        onClick={handleCloseAdvancedSearchModal}
      />

      <h1 className="mt-2 text-[1.2rem] font-medium">Advanced Search</h1>

      <div className="flex flex-col px-4 mt-4 mb-2 space-y-2 w-full">
        <h2 className="!m-0 font-medium dark:text-slate-200">Country</h2>

        <select
          name="regionCode"
          onChange={handleSelectOption}
          value={String(advancedSearchSettings.regionCode)}
          className={classNames(
            'w-full text-sm bg-transparent border-transparent focus:border-transparent',
            'dark:text-slate-200 dark:bg-slate-800 focus:ring-0'
          )}
        >
          {Object.values(countries).map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>

        <hr className="!my-4 border-t border-slate-200 dark:border-slate-700" />

        <h2 className="!m-0 font-medium dark:text-slate-200">Category</h2>

        <select
          name="videoCategoryId"
          onChange={handleSelectOption}
          value={Number(advancedSearchSettings.videoCategoryId)}
          className={classNames(
            'w-full text-sm bg-transparent border-transparent focus:border-transparent',
            'dark:text-slate-200 dark:bg-slate-800 focus:ring-0'
          )}
        >
          {Object.values(categories).map((category) => (
            <option key={category.code} value={category.code}>
              {category.name}
            </option>
          ))}
        </select>

        <hr className="!my-4 border-t border-slate-200 dark:border-slate-700" />

        <h2 className="!m-0 font-medium dark:text-slate-200">Published at</h2>

        <div className="flex overflow-x-auto space-x-4">
          <label htmlFor="from" className="flex items-center space-x-3 text-sm">
            <span>From: </span>
            <DatePicker
              onChange={(date: Date) =>
                handleDateChange(date, 'publishedAfter')
              }
              selected={advancedSearchSettings.publishedAfter}
              className={classNames(
                'p-1.5 font-light rounded-md border border-stone-300',
                'w-[5.5rem] dark:text-slate-200 bg-transparent focus:ring-0',
                'dark:border-slate-600'
              )}
            />
          </label>
          <label htmlFor="to" className="flex items-center space-x-3 text-sm">
            <span>To: </span>
            <DatePicker
              onChange={(date: Date) =>
                handleDateChange(date, 'publishedBefore')
              }
              selected={advancedSearchSettings.publishedBefore}
              className={classNames(
                'p-1.5 font-light rounded-md border border-stone-300',
                'w-[5.5rem] dark:text-slate-200 bg-transparent focus:ring-0',
                'dark:border-slate-600'
              )}
            />
          </label>
        </div>

        <hr className="!my-4 border-t border-slate-200 dark:border-slate-700" />

        <h2 className="!m-0 font-medium dark:text-slate-200">Sort by</h2>

        <div className="flex overflow-x-auto space-x-2 w-full whitespace-nowrap">
          {Object.entries({
            relevance: 'relevance',
            date: 'date',
            rating: 'rating',
            title: 'title',
            videos: 'videoCount',
            views: 'viewCount'
          }).map((option) => (
            <button
              key={option[0]}
              name="order"
              value={option[1]}
              type="button"
              onClick={handleSelectOne}
              className={classNames(
                'py-1.5 px-3 text-sm font-light text-stone-800 rounded-full',
                'lowercase hover:bg-stone-50 border border-stone-300',
                'dark:text-slate-200 dark:hover:bg-slate-700 dark:border-slate-500',
                advancedSearchSettings.order === option[1]
                  ? 'text-[#1967D2] bg-[#E8F0FE] hover:bg-[#D2E3FC] dark:bg-slate-700 dark:hover:bg-slate-600 border-[#D2E3FC]'
                  : ''
              )}
            >
              {option[0]}
            </button>
          ))}
        </div>

        <hr className="!my-4 border-t border-slate-200 dark:border-slate-700" />

        <h2 className="!m-0 font-medium dark:text-slate-200">Duration</h2>

        <div className="flex overflow-x-auto space-x-2 w-full whitespace-nowrap">
          {Object.entries({
            'less than 4 minutes': 'short',
            '4 to 20 minutes': 'medium',
            'more than 20 minutes': 'long'
          }).map((option) => (
            <button
              key={option[0]}
              name="videoDuration"
              value={option[1]}
              type="button"
              onClick={handleSelectOne}
              className={classNames(
                'py-1.5 px-3 text-sm font-light text-stone-800 rounded-full',
                'lowercase hover:bg-stone-50 border border-stone-300',
                'dark:text-slate-200 dark:hover:bg-slate-700 dark:border-slate-500',
                advancedSearchSettings.videoDuration === option[1]
                  ? 'text-[#1967D2] bg-[#E8F0FE] hover:bg-[#D2E3FC] dark:bg-slate-700 dark:hover:bg-slate-600 border-[#D2E3FC]'
                  : ''
              )}
            >
              {option[0]}
            </button>
          ))}
        </div>

        <hr className="!my-4 border-t border-slate-200 dark:border-slate-700" />

        <h2 className="!m-0 font-medium dark:text-slate-200">Type</h2>

        <div className="flex overflow-x-auto space-x-2 w-full whitespace-nowrap">
          {Object.entries({
            video: 'video',
            channel: 'channel',
            playlist: 'playlist'
          }).map((option) => (
            <button
              key={option[0]}
              name="type"
              value={option[1]}
              type="button"
              onClick={handleSelectMany}
              className={classNames(
                'py-1.5 px-3 text-sm font-light text-stone-800 rounded-full',
                'lowercase hover:bg-stone-50 border border-stone-300',
                'dark:text-slate-200 dark:hover:bg-slate-700 dark:border-slate-500',
                advancedSearchSettings.type.includes(option[1])
                  ? 'text-[#1967D2] bg-[#E8F0FE] hover:bg-[#D2E3FC] dark:bg-slate-700 dark:hover:bg-slate-600 border-[#D2E3FC]'
                  : ''
              )}
            >
              {option[0]}
            </button>
          ))}
        </div>

        <hr className="!my-4 border-t border-slate-200 dark:border-slate-700" />

        <h2 className="!m-0 font-medium text-slate-800 dark:text-slate-200">
          Features
        </h2>

        <div className="w-full">
          {Object.entries({
            subtitles: ['videoCaption', 'closedCaption'],
            'strict content': ['safeSearch', 'strict'],
            live: ['eventType', 'live'],
            movie: ['videoType', 'movie'],
            'high definition': ['videoDefinition', 'high'],
            '3d video': ['videoDimension', '3d'],
            embeddable: ['videoEmbeddable', 'true'],
            'creative commons': ['videoLicense', 'creativeCommon'],
            syndicated: ['videoSyndicated', 'true']
          }).map((option) => (
            <button
              key={option[0]}
              name="features"
              value={JSON.stringify({
                key: option[1][0],
                value: option[1][1]
              })}
              type="button"
              onClick={handleSelectManyToEntries}
              className={classNames(
                'py-1.5 px-3 mr-2 mb-2 text-sm font-light text-stone-800 rounded-full',
                'lowercase hover:bg-stone-50 border border-stone-300',
                'dark:text-slate-200 dark:hover:bg-slate-700 dark:border-slate-500',
                Object.keys(advancedSearchSettings.features).includes(
                  option[1][0]
                )
                  ? 'text-[#1967D2] bg-[#E8F0FE] hover:bg-[#D2E3FC] dark:bg-slate-700 dark:hover:bg-slate-600 border-[#D2E3FC]'
                  : ''
              )}
            >
              {option[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center py-2 space-x-2 w-full">
        <button
          type="button"
          className={classNames(
            'py-2 px-4 text-sm font-normal text-slate-900 bg-[#F8F9FA]',
            'rounded-sm hover:ring-1 hover:ring-slate-300 hover:shadow-md',
            'dark:text-slate-100 dark:hover:text-slate-200 dark:hover:ring-slate-600',
            'dark:bg-slate-700 dark:hover:bg-gray-900 dark:duration-300 dark:transform'
          )}
          onClick={() => handleResetSettings()}
        >
          Reset Settings
        </button>
      </div>
    </Modal>
  )
}
