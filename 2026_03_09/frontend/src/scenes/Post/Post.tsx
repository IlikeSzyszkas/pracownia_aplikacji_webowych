import styles from './Post.module.scss'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, Link } from 'react-router'
import { useState } from 'react'
import type { Post as PostType } from '../../types/Post/Post.ts'

export default function Post() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  // Zapytanie o post wraz z komentarzami
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/posts/${id}`)
      return response.json() as Promise<PostType>
    },
    enabled: !!id
  })

  // Mutacja do dodawania komentarza
  const addCommentMutation = useMutation({
    mutationFn: async (newComment: { author: string, content: string, postId: number }) => {
      const response = await fetch('http://localhost:8080/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] })
      setAuthor('')
      setContent('')
    }
  })

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (author.trim() && content.trim() && id) {
      addCommentMutation.mutate({ author, content, postId: Number(id) })
    }
  }

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
            <p className={styles.PostArticleBody}>{post.content}</p>
          </article>

          {/* Autor */}
          <section className={styles.PostAuthor}>
            <h2 className={styles.PostAuthorHeading}>Autor</h2>
            <div className={styles.PostAuthorCard}>
              <div className={styles.PostAuthorAvatar}>
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div className={styles.PostAuthorInfo}>
                <p className={styles.PostAuthorName}>{post.author}</p>
              </div>
            </div>
          </section>

          {/* Komentarze */}
          <section className={styles.PostComments}>
            <h2 className={styles.PostCommentsHeading}>
              Komentarze ({post.comments?.length || 0})
            </h2>
            {(!post.comments || post.comments.length === 0) && (
              <p className={styles.PostMessage}>Brak komentarzy.</p>
            )}
            {post.comments?.map(comment => (
              <div className={styles.PostCommentsCard} key={comment.id}>
                <div className={styles.PostCommentsCardHeader}>
                  <span className={styles.PostCommentsCardName}>{comment.author}</span>
                </div>
                <p className={styles.PostCommentsCardBody}>{comment.content}</p>
              </div>
            ))}

            {/* Formularz dodawania komentarza */}
            <form onSubmit={handleCommentSubmit} className={styles.PostCommentsForm} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', background: '#2c2c2c', borderRadius: '8px' }}>
              <h3 style={{ margin: 0, color: '#fff' }}>Dodaj komentarz</h3>
              <input 
                type="text" 
                placeholder="Twój podpis" 
                value={author}
                onChange={e => setAuthor(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '4px', border: 'none' }}
                required
              />
              <textarea 
                placeholder="Treść komentarza" 
                value={content}
                onChange={e => setContent(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '4px', border: 'none', minHeight: '80px' }}
                required
              />
              <button 
                type="submit" 
                disabled={addCommentMutation.isPending}
                style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-start' }}
              >
                {addCommentMutation.isPending ? 'Dodawanie...' : 'Dodaj komentarz'}
              </button>
            </form>
          </section>
        </>
      )}
    </div>
  )
}
