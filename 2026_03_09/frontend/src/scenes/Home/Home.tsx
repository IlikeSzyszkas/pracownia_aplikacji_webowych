import styles from './Home.module.scss'
import { Link } from 'react-router'

export default function Home() {
  return (
    <div className={styles.Home}>
      <h1 className={styles.HomeTitle}>Witaj na blogu!</h1>
      <p className={styles.HomeSubtitle}>
        Przeglądaj wpisy pobierane z JSONPlaceholder API.
      </p>
      <Link to="/wpisy" className={styles.HomeLink}>
        Przejdź do wpisów →
      </Link>
    </div>
  )
}
