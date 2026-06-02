import styles from './Post.module.scss'
import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router'
import type { Post as PostType } from '../../types/Post/Post.ts'
import type { User } from '../../types/User/User.ts'
import type { Comment } from '../../types/Comment/Comment.ts'

export default function Post() {
  const { id } = useParams<{ id: string }>()

  // Zapytanie o post
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      return response.json() as Promise<PostType>
    },
    enabled: !!id
  })

  // Zapytanie o użytkownika (zależy od post.userId)
  const { data: user } = useQuery({
    queryKey: ['user', post?.userId],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${post?.userId}`)
      return response.json() as Promise<User>
    },
    enabled: !!post?.userId
  })

  // Zapytanie o komentarze
  const { data: comments = [] } = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      return response.json() as Promise<Array<Comment>>
    },
    enabled: !!id
  })

  return (
    <div className={styles.Post}>
      <Link to="/wpisy" className={styles.PostBack}>← Wróć do listy wpisów</Link>

      {isLoading && (
        <div className={styles.PostMessage}>Trwa ładowanie...</div>
      )}
      {isError && (
        <div className={styles.PostMessage}>Wystąpił nieoczekiwany błąd!</div>
      )}

      {!isLoading && !isError && post && (
        <>
          {/* Treść posta */}
          <article className={styles.PostArticle}>
            <span className={styles.PostArticleId}>Wpis #{post.id}</span>
            <h1 className={styles.PostArticleTitle}>{post.title}</h1>
            <p className={styles.PostArticleBody}>{post.body}</p>
          </article>

          {/* Autor */}
          {user && (
            <section className={styles.PostAuthor}>
              <h2 className={styles.PostAuthorHeading}>Autor</h2>
              <div className={styles.PostAuthorCard}>
                <div className={styles.PostAuthorAvatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.PostAuthorInfo}>
                  <p className={styles.PostAuthorName}>{user.name}</p>
                  <p className={styles.PostAuthorDetail}>
                    <span>@{user.username}</span>
                  </p>
                  <p className={styles.PostAuthorDetail}>
                    <span>✉ </span>{user.email}
                  </p>
                  <p className={styles.PostAuthorDetail}>
                    <span>📍 </span>{user.address.city}
                  </p>
                  <p className={styles.PostAuthorDetail}>
                    <span>🏢 </span>{user.company.name}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Komentarze */}
          <section className={styles.PostComments}>
            <h2 className={styles.PostCommentsHeading}>
              Komentarze ({comments.length})
            </h2>
            {comments.length === 0 && (
              <p className={styles.PostMessage}>Brak komentarzy.</p>
            )}
            {comments.map(comment => (
              <div className={styles.PostCommentsCard} key={comment.id}>
                <div className={styles.PostCommentsCardHeader}>
                  <span className={styles.PostCommentsCardName}>{comment.name}</span>
                  <span className={styles.PostCommentsCardEmail}>{comment.email}</span>
                </div>
                <p className={styles.PostCommentsCardBody}>{comment.body}</p>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  )
}
