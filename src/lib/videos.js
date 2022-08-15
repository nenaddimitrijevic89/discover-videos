import videosData from 'data/videos'

export const getCommonVideos = async (url) => {
   const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

   try {
      const BASE_URL = 'https://youtube.googleapis.com/youtube/v3'

      const response = await fetch(`${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`)

      const data = await response.json()

      if (data?.error) {
         return []
      }

      return data.items.map((item) => {
         const id = item.id?.videoId || item.id
         return {
            title: item.snippet.title,
            imgUrl: item.snippet.thumbnails.high.url,
            id,
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
