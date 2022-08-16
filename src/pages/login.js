import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import styles from 'styles/Login.module.css'

const Login = () => {
   const [email, setEmail] = useState('')
   const [userMsg, setUserMsg] = useState('')

   const router = useRouter()

   const handleOnChangeEmail = (e) => {
      setUserMsg('')
      const email = e.target.value
      setEmail(email)
   }

   const handleLoginWithEmail = async (e) => {
      e.preventDefault()

      if (email) {
         if (email === 'nenad@gmail.com') {
            router.push('/')
         } else {
            setUserMsg('Something went wrong logging in')
         }
      } else {
         setUserMsg('Enter a valid email address')
      }
   }

   return (
      <div className={styles.container}>
         <Head>
            <title>Netflix SignIn</title>
         </Head>
         <header className={styles.header}>
            <div className={styles.headerWrapper}>
               <a className={styles.logoLink}>
                  <div className={styles.logoWrapper}>
                     <Image
                        src="/static/icons/netflix.svg"
                        alt="Netflix logo"
                        width="128px"
                        height="34px"
                     />
                  </div>
               </a>
            </div>
         </header>
         <main className={styles.main}>
            <div className={styles.mainWrapper}>
               <h1 className={styles.signinHeader}>Sign In</h1>

               <input
                  type="text"
                  onChange={handleOnChangeEmail}
                  placeholder="Email address"
                  className={styles.emailInput}
               />

               <p className={styles.userMsg}>{userMsg}</p>
               <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
                  Sign In
               </button>
            </div>
         </main>
      </div>
   )
}

export default Login
