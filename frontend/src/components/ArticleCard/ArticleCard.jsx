import './ArticleCard.css'

const ArticleCard = ({ title, author }) => {
  return (
    <li className="card">
      <div className="card__left">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg/1920px-2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg" alt="article image" className="card__left--image" />
      </div>
      <div className="card__right">
        <h3>{title}</h3>
        <div className="card__right__footer">
          <h6 className="card__right__footer--author">{author}</h6>
          <h6 className="card__right__footer--comment">5 Comments</h6>
        </div>
      </div>
    </li>
    );
}

export default ArticleCard