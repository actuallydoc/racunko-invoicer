import React from 'react'
import styles from './Navbar.module.css'

const NavTabs = [
    "Home",
    "Features",
    "About"]


export default function Navbar() {
    return (
        <div className={styles.navbarContainer}>
            <div>
                {NavTabs.map((tab, index) => (
                    <div key={index} className={styles.navTabText}>
                        <h1 className={styles.navTabText} id={tab}>{tab}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}
