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
    `https://www.googleapis.com/youtube/v3/search/?key=${process.env.YOUTUBE_API_KEY}&part=snippet&maxResults=50&${query}`
  )

  const youtubeResponse = await youtubeSearch.json()

  res.status(200).json(youtubeResponse)
}

/*
&part=snippet&maxResults=50
&order=relevance // date, rating, relevance, title, videoCount, viewCount
&safeSearch=none // moderate, none, strict
&type=video,channel,playlist
&videoCaption=any // any, closedCaption, none
&publishedAfter=1970-01-01T00:00:00Z
&publishedBefore=2100-01-01T00:00:00Z
&videoCategoryId=10 // see below
&videoDefinition=any // any, high, standard
&videoDimension=any // 2d, 3d, any
&videoDuration=any // any, long (longer than 20 minutes), medium (between 4 and 20 minutes), short (less than 4 minutes)
&videoEmbeddable=any // true
&videoLicense=any // any, creativeCommon, youtube
&videoSyndicated=any // true
&videoType=any // any, episode, movie
&regionCode=US
&eventType=live // upcoming, completed, live
&q=clean%20architecture%20and%20ddd
&pageToken=XXXXXX
&prevPageToken=XXXXXX
&nextPageToken=XXXXXX
*/

/* Video Category IDs:
2 - Autos & Vehicles
1 -  Film & Animation
10 - Music
15 - Pets & Animals
17 - Sports
18 - Short Movies
19 - Travel & Events
20 - Gaming
21 - Videoblogging
22 - People & Blogs
23 - Comedy
24 - Entertainment
25 - News & Politics
26 - Howto & Style
27 - Education
28 - Science & Technology
29 - Nonprofits & Activism
30 - Movies
31 - Anime/Animation
32 - Action/Adventure
33 - Classics
34 - Comedy
35 - Documentary
36 - Drama
37 - Family
38 - Foreign
39 - Horror
40 - Sci-Fi/Fantasy
41 - Thriller
42 - Shorts
43 - Shows
44 - Trailers
*/
