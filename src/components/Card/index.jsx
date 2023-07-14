import  React  from 'react';
import ContentLoader from "react-content-loader"
import style from './Card.module.scss'
import { AppContext } from '../../App';

function Card({ onFavorite, onPlus, id, imgUrl, price, title, favorited=false, loading=false}){
  const {isItemAdded}=React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj ={id,parentId: id,imgUrl, price, title}


  const onClickPlus = ()=>{
    onPlus(obj);
  };
  
  const onClickFavorite=()=>{
    onFavorite(obj);
    setIsFavorite(!isFavorite)
  };

    return (
        <div className={style.card}>
          {
            loading ? (<ContentLoader 
            speed={2}
            width={150}
            height={227}
            viewBox="0 0 150 250"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
           
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="150" /> 
            <rect x="0" y="164" rx="0" ry="0" width="150" height="15" /> 
            <rect x="0" y="190" rx="0" ry="0" width="100" height="15" /> 
            <rect x="4" y="227" rx="0" ry="0" width="80" height="25" /> 
            <rect x="113" y="220" rx="4" ry="4" width="32" height="32" />
          </ContentLoader>) : (
            <>
            <div className={style.favorite} onClick={onClickFavorite}>
        {onFavorite &&<img src={isFavorite ? "img/heart-liked.svg" : "img/heart.svg"} alt="Unliked"/>}
        </div>
        <img width={133} height={112} src={imgUrl}/>
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Ціна:</span>
            <b>{price} грн.</b>
          </div>
          {onPlus &&<img className={style.plus} onClick={onClickPlus} src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="Plus"/>}
        </div>
            </>
          )}
        
      </div>
    );
}

export default Card;