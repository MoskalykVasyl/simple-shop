import React from 'react'
import Info from "./Info";
import { AppContext } from '../App';
import axios from 'axios';
import { useCart } from '../hooks/useCart';

//костиль, бо вибрав mockAPI
const deley = (ms)=> new Promise((resolve)=>setTimeout(resolve, ms));

function Drawer({closeCart, onRemove, items=[]}){
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const {cartItems, setCartItems, totalPrice}= useCart();

  

  const onClickOrder=async()=>{
    try{
    const {data}= await axios.post('https://64aa812e0c6d844abede8403.mockapi.io/orders',{
      items : cartItems,
    });
    setOrderId(data.id);
    setIsOrderComplete(true);
    setCartItems([]);
      //костиль, бо вибрав mockAPI
    for (let i = 0; i < cartItems.length; i++) {
      const item=cartItems[i];
      await axios.delete('https://64a81684dca581464b85440d.mockapi.io/cart/'+item.id);
      await deley(1000);
      
    }

    }catch(error){
      alert("Не получилося створити заказ :(");
    }
  }
    return(
<div  className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between " >Кошик <img className="removeBtn cu-p" onClick={closeCart} src="img/btn-remove.svg" alt="Remove" /></h2>
        
        {items.length <1 ? (
          <Info 
            title={isOrderComplete ? "Заказ оформлено!" : "Кошик пустий"}
            description={isOrderComplete ? `Ваш заказ ${orderId} буде передано Новій пошті` : "Добавте хоча б одну пару красовків, щоб зробити замовлення"}
            image={isOrderComplete ? "img/complete-order.jpg" : "img/cart-empty.jpg"}
          />
        ):
        (
          
        <div className=" items">
          <div >

        {items.map((obj)=>(
          <div key={obj.id} className="cartItem d-flex align-center">
        <img className="mr-15" width={70} height={70} src={obj.imgUrl} alt="Sneakers" />
        <div className="mr-20"> 
        <p className="mb-5">{obj.title}</p>
        <b>{obj.price}</b>
        </div>
        <img className="removeBtn" onClick={()=> onRemove(obj.id)} src="img/btn-remove.svg" alt="Remove" />
        </div>))}
        </div> 
         <ul className="cartTotalBlock">
         <li className="d-flex">
           <span>Сума:</span>
           <div></div>
           <b> {totalPrice} грн.</b>
         </li>
         <li className="d-flex">
         <span>ПДВ 5%:</span>
           <div></div>
           <b> {Math.round(totalPrice*0.05)} грн.</b>
         </li>
        </ul>
        <button className="greenButton" onClick={onClickOrder}>Оформити заказ <img src="img/arrow.svg" alt="Arrow"/></button></div>
    )}
 

      </div>
      </div> 
    );
}

export default Drawer;