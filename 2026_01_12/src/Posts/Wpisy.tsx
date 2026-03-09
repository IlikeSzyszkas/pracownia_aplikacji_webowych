import { useParams, Link } from "react-router";
import { posts } from "../data/generatedData";
import "./Wpisy.scss";

export function Wpisy() {
    const { id } = useParams();
    const post = id
        ? posts.find(p => p.id === Number(id))
        : posts.filter(p => p.published)[0];
    const currentIndex = posts.findIndex(p => p.id === post?.id);
    const prevPost = posts[currentIndex - 1];
    const nextPost = posts[currentIndex + 1];

    if (!post) {
        return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h2>Post not found</h2>
            <Link to="/" style={{ color: 'var(--color-primary)' }}>Back to Home</Link>
        </div>;
    }

    return (
        <div className="post-detail container">
            <Link to="/" className="back-link">&larr; Strona Główna</Link>

            <article className="full-post">
                <header>
                    <div className="meta">
                        <span className="cat">{post.kategoria?.name} </span>
                        <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                    </div>
                    <h1>{post.title}</h1>
                </header>

                <div className="content">
                    {post.content.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </article>

            <section className="comments-section">
                <h3>Comments ({post.komentarze?.length || 0})</h3>
                <div className="comments-list">
                    {post.komentarze && post.komentarze.length > 0 ? (
                        post.komentarze.map(comment => (
                            <div key={comment.id} className="comment">
                                <div className="comment-header">
                                    <strong>User {comment.id} </strong>
                                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p>{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-comments">Nie ma jeszcze komentarzy.</p>
                    )}
                </div>
            </section>
            <div className="post-navigation">
                {prevPost ? (
                    <div className="post-navigation-prev">
                        <Link to={`/wpisy/${prevPost.id}`} >
                            &larr; {prevPost.title}
                        </Link>
                    </div>
                ) : <span />}

                {nextPost && (
                    <div className="post-navigation-next">
                        <Link to={`/wpisy/${nextPost.id}`} >
                            {nextPost.title} &rarr;
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}