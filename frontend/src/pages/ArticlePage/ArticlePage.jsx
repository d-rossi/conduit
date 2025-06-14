import { useEffect } from "react"
import Button from "../../components/Button/Button"
import Comments from "../../components/Comments/Comments"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import { useParams } from 'react-router-dom'
import "./ArticlePage.css"
import { getArticle } from "../../services/articleService"
import { useState } from "react"

const ArticlePage = () => {
    const { articleId } = useParams()
    const [article, setArticle] = useState(null)
    useEffect(() => {
        getArticle(articleId).then((data) => setArticle(data)).catch(err => console.log(err))
    }, [])

    if (article) {
        return (
        <div className="article-page">
            <div className="article">
                <h2 className="article__title">{article.title}</h2>
                <p className="article__content">{article.content}</p>
            </div>
            <div className="sidebar">
                <ProfileCard />
                <Comments />
            </div>
        </div>
    )
    }
    else {
        <h1>Waiting...</h1>
    }
}

export default ArticlePage