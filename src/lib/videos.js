import videoTestData from 'data/videos'

import { getWatchedVideos } from './db/hasura'

const fetchVideos = async (url) => {
   const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
   const BASE_URL = 'https://youtube.googleapis.com/youtube/v3'

   const response = await fetch(`${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`)
   return await response.json()
}

export const getCommonVideos = async (url) => {
   try {
      const isDev = process.env.DEVELOPMENT

      const data = isDev ? videoTestData : await fetchVideos(url)
      if (data?.error) {
         return []
      }

      return data.items.map((item) => {
         const id = item.id?.videoId || item.id
         const snippet = item.snippet
         return {
            title: snippet?.title,
            imgUrl: snippet.thumbnails.high.url,
            id,
            description: snippet.description,
            publishTime: snippet.publishedAt,
            channelTitle: snippet.channelTitle,
            statistics: item.statistics ? item.statistics : { viewCount: 0 },
         }
      })
   } catch (err) {
      console.error('Something went wrong with video library', err)
      return []
   }
}

export const getVideos = async (searchQuery) => {
   const URL = `search?part=snippet&q=${searchQuery}&type=video`

   return getCommonVideos(URL)
}

export const getPopularVideos = async () => {
   const URL = 'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=RS'

   return getCommonVideos(URL)
}

export const getYoutubeVideoById = async (videoId) => {
   const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`

   return getCommonVideos(URL)
}

export const getWatchItAgainVideos = async (userId, token) => {
   const videos = await getWatchedVideos(userId, token)

   return videos.map((video) => ({
      id: video.videoId,
   }))
}
