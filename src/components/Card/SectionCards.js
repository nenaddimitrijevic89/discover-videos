import styles from './SectionCards.module.css'

import Card from './Card'

const SectionCards = (props) => {
   const { title, videos, size } = props
   return (
      <section className={styles.container}>
         <h2 className={styles.title}>{title}</h2>
         <div className={styles.cardWrapper}>
            {videos.map((video, i) => (
               <Card key={i} id={i} imgUrl={video.imgUrl} size={size} />
            ))}
         </div>
      </section>
   )
}

export default SectionCards
