import React from "react";
import axios from "axios";
import Card from "../components/Card";
import { AppContext } from "../App";


function Orders( ) {
const [orders, setOrders]= React.useState([]);
const [isLoading, setIsLoading] = React.useState(true);
const {onAddToFavorite,onAddToCart}=React.useContext(AppContext);
    React.useEffect(()=>{
        (async ()=>{
            try{
            const {data}= await axios.get('https://64aa812e0c6d844abede8403.mockapi.io/orders');
            setOrders(data.reduce((prev, obj)=>[...prev, ...obj.items],[]));
            setIsLoading(false);
            }catch(error){
                alert("Помилка при запиті заказів")
            }
        })()
    }, [])
    return(
<div className="content p-40">
      <div className="d-flex align-center justify-between  mb-40">
      <h1>Мої замовлення</h1>
      </div>

      <div className="d-flex flex-wrap">
      {
        (isLoading ? [...Array(4)]: orders).map((item)=>(
          <Card 
          key={item && item.title} //унікальний ключ (бажано брати id)            
              loading = {isLoading}
              {...item}
          />
        ))
       }
      </div>
       </div>
    );
}

export default Orders;