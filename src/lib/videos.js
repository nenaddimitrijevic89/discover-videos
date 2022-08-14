import videosData from 'data/videos'

export const getVideos = () => {
   return videosData.items.map((item) => ({
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item?.id?.videoId,
   }))
}
