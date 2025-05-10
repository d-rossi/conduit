import './ArticleCard.css'

const ArticleCard = ({ title, author, img, onClick }) => {
  return (
    <li className="card" onClick={onClick}>
      <div className="card__left">
        <img src={img} alt="article image" className="card__left--image" />
      </div>
      <div className="card__right">
        <h3>{title}</h3>
        <div className="card__right__footer">
          <h6 className="card__right__footer--author">{author}</h6>
          <h6 className="card__right__footer--comment">5</h6>
        </div>
      </div>
    </li>
    );
}

export default ArticleCard