import React from 'react'
import { Link } from "react-router-dom";
import { useCart } from '../hooks/useCart';


function Header(props){
  const {totalPrice}= useCart();

    return(
        <header className="d-flex justify-between align-center">
           <Link  to="/simple-shop/">
        <div className="d-flex align-center">
       
        <img width={100} height={100} src="img/logo.png"/>
        <div className="headerInfo">
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин красовок</p>
        </div>
       
        </div>
        </Link>
        <ul className="d-flex">
          <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img width={18} height={18} src="img/icon-cart.svg" alt="Корзина"/>
            <span className="ml-10">{totalPrice} грн.</span>
             </li>
          <li className="mr-15 cu-p">
            <Link to="/simple-shop/favorites">
          <img  width={18} height={18} src="img/heart.svg" alt="Закладки"/>
          </Link>
          </li>
          <li> 
            <Link to="/simple-shop/orders">
            <img width={18} height={18} src="img/iconUser.png" alt="User"/>
            </Link>
          </li>
        </ul>
       </header>
    );
}
export default Header;