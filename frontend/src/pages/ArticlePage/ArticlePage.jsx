import ProfileCard from "../../components/ProfileCard/ProfileCard"
import "./ArticlePage.css"

const ArticlePage = () => {
    return (
        <div className="article-page">
            <div className="article">
                <h2 className="article__title">Article TITLE</h2>
                <p className="article__content">CONTENT sdsadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsa</p>
            </div>
            <div className="sidebar">
                <ProfileCard />
                <div className="comments">
                    <h2>Comments</h2>
                </div>
            </div>
        </div>
    )
}

export default ArticlePage