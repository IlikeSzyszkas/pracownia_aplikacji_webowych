import { categories, posts } from "../data/generatedData";
import "./Kategorie.scss";
import {Link} from "react-router";

export function Kategorie() {
    const getPostCount = (catId: number) => {
        return posts.filter(p => p.kategoriaId === catId && p.published).length;
    }

    return (
        <div className="category-home container">
            <header className="page-header">
                <h1>Kategorie</h1>
                <p>Przeglądaj artykuły według tematu</p>
            </header>

            <div className="category-grid">
                {categories.map(cat => (
                    <div key={cat.id} className="category-card">
                        <div className="card-content">
                            <h2>{cat.name}</h2>
                            <span className="count">{getPostCount(cat.id)} wpis{getPostCount(cat.id)==1? "" : "y" }</span>
                        </div>
                        <div className="card-action">
                            {posts
                                .filter(p => p.kategoriaId === cat.id && p.published)
                                .map(p => (
                                    <li key={p.id}>
                                        <Link to={`/wpisy/${p.id}`}>&rarr; {p.title}</Link>
                                    </li>
                                ))

                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}