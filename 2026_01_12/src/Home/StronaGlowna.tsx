import { Link } from "react-router";
import { posts } from "../data/generatedData";
import "./StronaGlowna.scss";

export function StronaGlowna() {
    const publishedPosts = posts.filter(p => p.published);

    return (
        <div className="home container">
            <header className="home-header">
                <h1>Najnowsze wpisy</h1>
            </header>

            <div className="post-grid">
                {publishedPosts.map(post => (
                    <article key={post.id} className="post-card">
                        <div className="post-meta">
                            <span className="category-tag">{post.kategoria?.name} </span>
                            <span className="date">{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h2>{post.title}</h2>
                        <p className="excerpt">
                            {post.content.substring(0, 100)}...
                        </p>
                        <Link to={`/wpisy/${post.id}`} className="read-more">
                            Pełen artykuł
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}