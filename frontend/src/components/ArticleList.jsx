import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard/ArticleCard"
import { getArticles } from "../services/articleService"
import { useNavigate } from "react-router-dom"

const ArticleList = () => {
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()

    const onArticleClick = (articleId) => {
         navigate(`/articles/${articleId}`)

    }


    useEffect(() => {
        getArticles().then((articles) => setArticles(articles))
    }, [])

    return (
        <div>
            <ul>
                {articles.map(article => 
                    <ArticleCard key={article.id} title={article.title} author={article.userId?.username} img={article.imgUrl} onClick={() => onArticleClick(article.id)} />
                )}
            </ul>
        </div>
    )
}

export default ArticleList