import styles from './Posts.module.scss'
import { useEffect, useState } from 'react'
import type { Post } from '../../types/Post/Post.ts'
import { Link } from 'react-router'

export default function Posts() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [posts, setPosts] = useState<Array<Post>>([])

  useEffect(() => {
    setIsLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        setPosts(json as Array<Post>)
      })
      .catch(() => {
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className={styles.Posts}>
      <h1 className={styles.PostsHeading}>Wpisy</h1>

      {isLoading && (
        <div className={styles.PostsMessage}>Trwa ładowanie...</div>
      )}
      {isError && (
        <div className={styles.PostsMessage}>Wystąpił nieoczekiwany błąd!</div>
      )}
      {!isLoading && !isError && (
        <>
          {posts.length === 0 && (
            <div className={styles.PostsMessage}>Brak wpisów 😭</div>
          )}
          <div className={styles.PostsGrid}>
            {posts.map(p => (
              <div className={styles.PostsCard} key={p.id}>
                <span className={styles.PostsCardId}>#{p.id}</span>
                <h2 className={styles.PostsCardTitle}>{p.title}</h2>
                <p className={styles.PostsCardBody}>
                  {p.body.substring(0, 80)}...
                </p>
                <Link to={'/wpisy/' + p.id} className={styles.PostsCardLink}>
                  Czytaj dalej →
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
