import Link from 'next/link'

import styles from './SectionCards.module.css'

import Card from './Card'

const SectionCards = (props) => {
   const { title, videos = [], size } = props

   return (
      <section className={styles.container}>
         <h2 className={styles.title}>{title}</h2>
         <div className={styles.cardWrapper}>
            {videos.map((video, i) => (
               <Link href={`/video/${video.id}`} key={i}>
                  <a>
                     <Card id={i} imgUrl={video.imgUrl} size={size} />
                  </a>
               </Link>
            ))}
         </div>
      </section>
   )
}

export default SectionCards
