import './ArticleCard.css'

const ArticleCard = () => {
  return (
    <li class="card">
      <div class="card__left">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg/1920px-2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg" alt="article image" class="card__left--image" />
      </div>
      <div class="card__right">
        <h3>TITLE</h3>
        <div class="card__right__footer">
          <h6 class="card__right__footer--author">Author</h6>
          <h6 class="card__right__footer--comment">5 Comments</h6>
        </div>
      </div>
    </li>
    );
}

export default ArticleCard