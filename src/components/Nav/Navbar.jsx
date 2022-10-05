import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { magic } from 'lib/magic-link'

import styles from './Navbar.module.css'

const NavBar = () => {
   const [showDropdown, setShowDropdown] = useState(false)
   const [username, setUsername] = useState('')
   const [didToken, setDidToken] = useState('')
   console.log({ didToken })

   const router = useRouter()

   useEffect(() => {
      async function getUsername() {
         try {
            const { email } = await magic.user.getMetadata()
            const didToken = await magic.user.getIdToken()

            if (email) {
               setUsername(email)
               setDidToken(didToken)
            }
         } catch (err) {
            console.error('Error retrieving email: ', err)
         }
      }
      getUsername()
   }, [])

   const handleOnClickHome = (e) => {
      e.preventDefault()
      router.push('/')
   }

   const handleOnClickMyList = (e) => {
      e.preventDefault()
      router.push('/browse/my-list')
   }

   const handleShowDropdown = (e) => {
      e.preventDefault()
      setShowDropdown(!showDropdown)
   }

   const handleLogout = async (e) => {
      e.preventDefault()

      try {
         const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${didToken}`,
               'Content-Type': 'application/json',
            },
         })

         await response.json()
      } catch (err) {
         console.error('Error logging out', err)
         router.push('/login')
      }
   }

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
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
            <ul className={styles.navItems}>
               <li className={styles.navItem} onClick={handleOnClickHome}>
                  Home
               </li>
               <li className={styles.navItem2} onClick={handleOnClickMyList}>
                  My List
               </li>
            </ul>
            <nav className={styles.navContainer}>
               <div>
                  <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                     <p className={styles.username}>{username}</p>
                     <Image
                        src="/static/icons/expand_more.svg"
                        alt="Expand dropdown"
                        width="24px"
                        height="24px"
                     />
                  </button>

                  {showDropdown && (
                     <div className={styles.navDropdown}>
                        <div>
                           <a className={styles.linkName} onClick={handleLogout}>
                              Sign out
                           </a>
                           <div className={styles.lineWrapper}></div>
                        </div>
                     </div>
                  )}
               </div>
            </nav>
         </div>
      </div>
   )
}

export default NavBar
