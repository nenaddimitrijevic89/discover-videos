import { useState } from 'react'
import Image from 'next/image'

import styles from './Card.module.css'

const placeholderImg =
   'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80'

const Card = (props) => {
   const { imgUrl = placeholderImg, size = 'medium' } = props

   const [imgSrc, setImgSrc] = useState(imgUrl)

   const classMap = {
      large: styles.lgItem,
      medium: styles.mdItem,
      small: styles.smItem,
   }

   const handleOnError = () => {
      setImgSrc(placeholderImg)
   }

   return (
      <div className={styles.container}>
         <div className={classMap[size]}>
            <Image
               src={imgSrc}
               alt="image"
               layout="fill"
               onError={handleOnError}
               className={styles.cardImg}
            />
         </div>
      </div>
   )
}

export default Card
