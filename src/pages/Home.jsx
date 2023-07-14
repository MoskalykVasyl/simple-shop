import React from 'react';
import Card from '../components/Card'


function Home({          
    items,
    searchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading} ) {
        
    
    const renderItems=()=> {
        const filtredItems = items.filter((item)=>item.title.toLowerCase().includes(searchValue.toLowerCase()), 
        );
        
        return (isLoading ? [...Array(8)] : filtredItems).map((item)=>(
              <Card 
              key={item && item.title} //унікальний ключ (бажано брати id)            
              onFavorite={(obj)=>onAddToFavorite(obj)}
              onPlus={(obj)=>onAddToCart(obj)}             
              loading = {isLoading}
              {...item}
              />
              
            ));
            
    } ;
    return(
<div className="content p-40">
      <div className="d-flex align-center justify-between  mb-40">
      <h1>{searchValue? `Пошук за запитом: ${searchValue}`: 'Всі красовки'}</h1>
      <div className="search-block d-flex">
        <img src="img/icon-search.svg" alt="Search"/>
        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Пошук..."/>
      </div>
      </div>

      <div className="d-flex flex-wrap">
       {
       renderItems()
       }
      </div>
       </div>
    );
}

export default Home;