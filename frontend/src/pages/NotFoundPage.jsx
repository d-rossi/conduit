import { Link } from "react-router-dom"
import "./NotFoundPage.css"

const NotFoundPage = () => {
    return (
        <div className="not_found">
            <p>Oops! Looks like you have reached a dead end!</p>
            <Link to="/" className="not_found--link">Go back to Home</Link>
        </div>
    )
}

export default NotFoundPage