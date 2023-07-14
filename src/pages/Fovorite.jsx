import React from "react";
import Card from "../components/Card";
import { AppContext } from "../App";

function Favorite( ) {
  const {favorites, onAddToFavorite} = React.useContext(AppContext);
  
    return(
<div className="content p-40">
      <div className="d-flex align-center justify-between  mb-40">
      <h1>Мої закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
      {
        favorites.map((item)=>(
          <Card 
          key={item.title} //унікальний ключ (бажано брати id)
          id={item.id}
          title={item.title}
          price={item.price}
          imgUrl={item.imgUrl}
          favorited={true}
          onFavorite={onAddToFavorite}
          />
        ))
       }
      </div>
       </div>
    );
}

export default Favorite;