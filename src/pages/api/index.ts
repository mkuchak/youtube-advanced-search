import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  let query = Object.keys(req.query)
    .map((key) => `${key}=${req.query[key]}`)
    .join('&')

  if (!req.query.regionCode) {
    query += '&regionCode=US'
  }

  const youtubeSearch = await fetch(
    `https://www.googleapis.com/youtube/v3/search/?key=${process.env.YOUTUBE_API_KEY}&part=id,snippet&maxResults=50&${query}`
  )

  const youtubeResponse = await youtubeSearch.json()

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')

  res.status(200).json(youtubeResponse)
}
