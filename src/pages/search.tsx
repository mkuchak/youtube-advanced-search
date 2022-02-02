import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { AdvancedSearchModal } from '../components/AdvancedSearchModal'
import { DarkModeButton } from '../components/DarkModeButton'
import { SearchBar } from '../components/SearchBar'
import { YouTubeLogo } from '../components/YouTubeLogo'
import { classNames } from '../utils/classNames'
import { getYoutubeUrl } from '../utils/getYoutubeUrl'

interface DefaultOrMediumOrHigh {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: DefaultOrMediumOrHigh;
  medium: DefaultOrMediumOrHigh;
  high: DefaultOrMediumOrHigh;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface Id {
  kind: string;
  videoId?: string | null;
  playlistId?: string | null;
  channelId?: string | null;
}

interface ItemsEntity {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface Videos {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items?: ItemsEntity[] | null;
}

export default function Search ({ data }: { data: Videos }) {
  const router = useRouter()
  const { q } = router.query

  return (
    <>
      <Head>
        <title>{q} - YouTube - Advanced Search</title>
        <meta name="description" content={`Advanced YouTube Search for ${q}`} />
      </Head>

      <div className="overflow-visible">
        <header
          className={classNames(
            'flex sticky top-0 flex-col justify-between items-center',
            'py-4 px-2 space-y-5 w-full sm:flex-row sm:px-6 sm:space-y-0 min-h-20',
            'bg-[#FFFFFFDD] dark:bg-[#111827BB]',
            'border-b border-slate-200 dark:border-slate-700',
            'backdrop-blur-sm dark:backdrop-blur-lg'
          )}
        >
          <div className="container flex mx-auto">
            <div className="flex flex-col items-center space-y-4 w-full sm:flex-row sm:space-y-0">
              <Link href="/">
                <a>
                  <div className="mr-8 w-[8.5rem] sm:w-[9rem]">
                    <YouTubeLogo />
                  </div>
                </a>
              </Link>

              <SearchBar minified />
              <AdvancedSearchModal />
            </div>

            <div className="hidden justify-end sm:flex sm:mt-1 sm:w-[9rem] sm:h-[2.65rem]">
              <DarkModeButton />
            </div>
          </div>
        </header>

        <main className="container flex flex-col py-6 px-4 mx-auto space-y-5 text-black dark:text-white">
          <p>
            {data.pageInfo?.totalResults.toLocaleString('en-US') ?? '0'} results
            for &quot;{q}
            &quot;
          </p>

          {data.items &&
            data.items.map((item) => (
              <div
                key={item.etag}
                className="flex flex-col space-y-3 w-full lg:w-2/3"
              >
                <a
                  href={getYoutubeUrl(item.id)}
                  className={classNames(
                    'flex items-center hover:underline cursor-pointer',
                    'text-lg text-[#1a0dab] dark:text-[#669bff] sm:text-xl'
                  )}
                >
                  {item.snippet.title}
                </a>
                <div
                  className={classNames(
                    'flex flex-col space-y-4 sm:flex-row sm:space-y-0'
                  )}
                >
                  <div
                    className={classNames(
                      'flex w-full sm:w-fit',
                      item.id.kind === 'youtube#channel'
                        ? 'justify-center items-center'
                        : ''
                    )}
                  >
                    <a
                      href={getYoutubeUrl(item.id)}
                      style={{
                        backgroundImage: `url(${item.snippet.thumbnails.high.url})`
                      }}
                      className={classNames(
                        'flex justify-center items-center',
                        'object-cover bg-center bg-cover cursor-pointer',
                        item.id.kind === 'youtube#channel'
                          ? 'w-[10rem] min-h-[10rem] rounded-full sm:min-w-[8rem] sm:h-[8rem]'
                          : 'min-w-full h-[12rem] rounded-2xl sm:min-w-[14rem] sm:h-[7.8rem]'
                      )}
                    >
                      {item.id.kind !== 'youtube#channel' && (
                        <svg
                          className="w-12 h-12"
                          fill="#ffffffbb"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path>
                        </svg>
                      )}
                    </a>
                  </div>
                  <div
                    className="flex flex-col justify-between py-2.5 px-4 space-y-4 text-[#4d5156] dark:text-[#e0dbd4]"
                    style={{ wordBreak: 'break-word' }}
                  >
                    <div>
                      {item.snippet.description
                        ? item.snippet.description
                        : `${item.snippet.title} ${item.id.kind
                          .split('#')
                          .pop()}`}
                    </div>
                    <div className="inline-flex space-x-1 xs:block xs:space-x-0">
                      <span className="capitalize">
                        {item.id.kind.split('#').pop()}
                      </span>
                      <span className="xs:hidden">•</span>
                      <a
                        href={`https://youtube.com/channel/${item.snippet.channelId}`}
                        className="font-medium hover:underline"
                      >
                        {item.snippet.channelTitle}
                      </a>
                      <span className="xs:hidden">•</span>
                      <span>
                        {new Date(item.snippet.publishedAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </main>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryString = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&')

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?${queryString}`)
  const data = await res.json()

  return {
    props: { data }
  }
}
