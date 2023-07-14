import React from 'react';
import axios from 'axios';
import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home.jsx';
import Favorite from './pages/Fovorite.jsx';
import Header from './components/Header.jsx';
import Drawer from './components/Drawer.jsx';
import Orders from './pages/Orders.jsx';

export const AppContext = React.createContext({});


function App() {
const [items, setItems] = React.useState([]);
const [cartItems, setCartItems] = React.useState([]);
const [favorites, setFavorites] = React.useState([]);
const [searchValue, setSearchValue] = React.useState('');
const [cartOpened, setCartOpened] = React.useState(false);
const [isLoading, setIsLoading] = React.useState(true);
 
React.useEffect(()=>{
  async function fetchData(){ 
  
  try{
    const [favoritesResponse,cartResponse,itemsResponse] = await Promise.all([
      axios.get('https://64aa812e0c6d844abede8403.mockapi.io/favorites'),
      axios.get('https://64a81684dca581464b85440d.mockapi.io/cart'),
      axios.get('https://64a81684dca581464b85440d.mockapi.io/items')
  ]);
    
   
    setIsLoading(false);
    
    setFavorites(favoritesResponse.data);
    setCartItems(cartResponse.data);
    setItems(itemsResponse.data);
  } catch(error){
    alert("Помилка при запиті даних :(");
  }
  
  }

  fetchData();
}, []);



const onAddToCart= async (obj)=>{
  try{
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
  if (findItem){
    setCartItems((prev)=> prev.filter((item)=>Number(item.parentId)!== Number(obj.id)));
    await axios.delete(`https://64a81684dca581464b85440d.mockapi.io/cart/${findItem.id}`);
  } else{
    setCartItems(prev=>[...prev, obj])
    const {data}= await axios.post('https://64a81684dca581464b85440d.mockapi.io/cart',obj);
    setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
  }
  }catch(error){
    alert("Не получилося добавити товар в корзину")
  }
  
}


const onAddToFavorite= async (obj)=>{
  try{
    if(favorites.find((favObj)=>favObj.id===obj.id)){
      axios.delete(`https://64aa812e0c6d844abede8403.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev)=>prev.filter((item)=>item.id !== obj.id));
    }else{
      //в data витягуємо з axios інфу про товар який добавляємо
    const {data}=await axios.post('https://64aa812e0c6d844abede8403.mockapi.io/favorites',obj)
    setFavorites(prev=>[...prev, data])
    }
  }catch(error){
  alert("Не получилось добавити в закладки")
}
}

const onRemoveItem=(id)=>{
  try {
    //console.log(id) ! Undefined id бо його ми получаємо тільки при першому рендеренгу сторінки
  axios.delete(`https://64a81684dca581464b85440d.mockapi.io/cart/${id}`);
  setCartItems((prev)=>prev.filter(item=> item.id !== id));
  } catch (error) {
    alert("Помилка при видалені з корзини")
  }
}

const onChangeSearchInput =(event)=>{
  setSearchValue(event.target.value);
}

const isItemAdded=(id)=>{
  return cartItems.some((obj)=>Number(obj.parentId)===Number(id));
}

  return (
    <AppContext.Provider value={{cartItems, favorites, items, isItemAdded,onAddToFavorite,onAddToCart,setCartOpened,setCartItems}}>
    <div className="wrapper clear">
     {cartOpened && <Drawer items={cartItems} closeCart={()=>setCartOpened(false)} onRemove={onRemoveItem}/> }
    <Header onClickCart={()=>setCartOpened(true)}/>
     
    <Routes>
        <Route
          path=""
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading ={!items.length}
            />
          }
          exact
        />
        <Route
        path="favorites"
        element={<Favorite 
          />}
        />
        <Route
        path="orders"
        element={<Orders 
          />}
        />
      </Routes>
    </div>
    </AppContext.Provider>
    
  );
  
}

export default App;
