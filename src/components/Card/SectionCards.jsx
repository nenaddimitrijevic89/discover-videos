import Link from 'next/link'
import clsx from 'classnames'

import styles from './SectionCards.module.css'

import Card from './Card'

const SectionCards = (props) => {
   const { title, videos = [], size, shouldWrap = false, shouldScale } = props

   return (
      <section className={styles.container}>
         <h2 className={styles.title}>{title}</h2>
         <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
            {videos.map((video, i) => (
               <Link href={`/video/${video.id}`} key={i}>
                  <a>
                     <Card id={i} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale} />
                  </a>
               </Link>
            ))}
         </div>
      </section>
   )
}

export default SectionCards
