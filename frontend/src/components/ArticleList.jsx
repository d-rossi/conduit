import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard/ArticleCard"
import { getArticles } from "../services/articleService"

const ArticleList = () => {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        getArticles().then((articles) => setArticles(articles))
    }, [])
    return (
        <div>
            <ul>
                {articles.map(article => 
                    <ArticleCard key={article.id} title={article.title} author={article.userId} />
                )}
            </ul>
        </div>
    )
}

export default ArticleList