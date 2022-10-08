import Head from 'next/head'

import styles from 'styles/MyList.module.css'

import { getMyList } from 'lib/videos'
import { useUser as userInfo } from 'hooks/useRedirectUser'

import NavBar from 'components/Nav/Navbar'
import SectionCards from 'components/Card/SectionCards'

const MyList = ({ myListVideos }) => {
   return (
      <div>
         <Head>
            <title>My list</title>
         </Head>
         <main className={styles.main}>
            <NavBar />
            <div className={styles.sectionWrapper}>
               <SectionCards
                  title="My List"
                  videos={myListVideos}
                  size="small"
                  shouldWrap
                  shouldScale={false}
               />
            </div>
         </main>
      </div>
   )
}

export async function getServerSideProps(context) {
   const { userId, token } = await userInfo(context)

   const videos = await getMyList(userId, token)
   return {
      props: {
         myListVideos: videos,
      },
   }
}

export default MyList
