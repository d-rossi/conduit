import { useState } from "react"
import ArticleCard from "./ArticleCard/ArticleCard"

const ArticleList = () => {
    const [articles, setArticles] = useState([1, 2, 3])
    //get articles in useEffect
    //set articles state
    //iterate over articles and display them
    return (
        <div>
            <ul>
                {articles.map(article => 
                    <ArticleCard />
                )}
            </ul>
        </div>
    )
}

export default ArticleList