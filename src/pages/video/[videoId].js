import { useRouter } from 'next/router'

import Modal from 'react-modal'
import clsx from 'classnames'

import styles from 'styles/Video.module.css'

Modal.setAppElement('#__next')

const Video = ({ video }) => {
   const router = useRouter()

   const videoId = router.query.videoId

   const { title, publishTime, description, channelTitle, viewCount } = video

   return (
      <div className={styles.container}>
         video page {router.query.videoId}
         <Modal
            isOpen={true}
            contentLabel="Watch the video"
            onRequestClose={() => router.back()}
            className={styles.modal}
            overlayClassName={styles.overlay}
         >
            <iframe
               id="player"
               className={styles.videoPlayer}
               type="text/html"
               width="100%"
               height="390"
               src={`http://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
               frameBorder="0"
            ></iframe>
            <div className={styles.modalBody}>
               <div className={styles.modalBodyContent}>
                  <div className={styles.col1}>
                     <p className={styles.publishTime}>{publishTime}</p>
                     <p className={styles.title}>{title}</p>
                     <p className={styles.description}>{description}</p>
                  </div>
                  <div className={styles.col2}>
                     <p className={clsx(styles.subText, styles.subTextWrapper)}>
                        <span className={styles.textColor}>Cast: </span>
                        <span className={styles.channelTitle}>{channelTitle}</span>
                     </p>
                     <p className={clsx(styles.subText, styles.subTextWrapper)}>
                        <span className={styles.textColor}>View Count: </span>
                        <span className={styles.channelTitle}>{viewCount}</span>
                     </p>
                  </div>
               </div>
            </div>
         </Modal>
      </div>
   )
}

export async function getStaticProps() {
   const video = {
      title: 'Hi cute dog',
      publishTime: '1990-01-01',
      description: 'A big red dog that is super cute, can he get any bigger?',
      channelTitle: 'Paramount Pictures',
      viewCount: 10000,
   }

   return {
      props: {
         video,
      },
      revalidate: 10,
   }
}

export async function getStaticPaths() {
   const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ']

   const paths = listOfVideos.map((videoId) => ({
      params: { videoId },
   }))

   return {
      paths,
      fallback: 'blocking',
   }
}

export default Video
