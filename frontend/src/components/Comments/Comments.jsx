import Button from "../Button/Button"
import "./Comments.css"
import plusIcon from "../../assets/icons/plus_icon.svg"

const Comments = () => {
    return (
        <div className="comments-card">
            <div className="comments-card__comment">
                <h2>Comments</h2>
                <img src={plusIcon} alt="Home icon" className=""/>
            </div>
            <div className="comments-card__comment">
                <p className="comments-card__comment--text">3 followers adsfdf fdfdffsasafs afsafsffsdfs afsafas asdsadsdas asdsadsadad adadsssssssssssssssssss aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                <h4 className="comments-card__comment--name">NAME</h4>
            </div>
            <div className="comments-card__comment">
                <p className="comments-card__comment--text">3 followers adsfdf fdfdffsasafs afsafsffsdfs afsafas asdsadsdas asdsadsadad adadsssssssssssssssssss aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                <h4 className="comments-card__comment--name">NAME</h4>
            </div>

        </div>
    )
}

export default Comments