import styles from './Posts.module.scss'
import { useQuery } from '@tanstack/react-query'
import type { Post } from '../../types/Post/Post.ts'
import { Link } from 'react-router'

export default function Posts() {
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      return response.json() as Promise<Array<Post>>
    }
  })

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
