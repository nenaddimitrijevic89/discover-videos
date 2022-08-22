import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import 'styles/globals.css'

import { magic } from 'lib/magic-link'

import Loading from 'components/Loading/Loading'

function MyApp({ Component, pageProps }) {
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   //  useEffect(() => {
   //     const handleLoggedIn = async () => {
   //        const isLoggedIn = await magic.user.isLoggedIn()
   //        if (isLoggedIn) {
   //           router.push('/')
   //        } else {
   //           router.push('/login')
   //        }
   //     }
   //     handleLoggedIn()
   //  }, [])

   useEffect(() => {
      const handleComplete = () => {
         setIsLoading(false)
      }
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)

      return () => {
         router.events.off('routeChangeComplete', handleComplete)
         router.events.off('routeChangeError', handleComplete)
      }
   }, [router])

   return isLoading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp
