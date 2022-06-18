
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href="/game" >GO TO THE SNAKE GAME</Link>
    </div>
  )
}
