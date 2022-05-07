import React, { useEffect } from 'react'

import style_nb  from "./Navbar.module.css"
import {IoIosSearch} from "react-icons/io"

import {VscLocation} from "react-icons/vsc"

import {AiOutlineHeart} from "react-icons/ai"

import {CgShoppingCart} from "react-icons/cg"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems } from '../redux/actions';
const Navbar = () => {

  const navigate=useNavigate();

  const dispatch=useDispatch();

    const items = useSelector((state) => state.cartShortReducer.cartList);

    useEffect(() => {
      dispatch(getCartItems());
    }, []);
       

    let countcart=0;
    items.map((ele)=>(

      countcart=countcart+ele.q_cart
    )
    
    )
     
  
  return (
   <>
         <div className={style_nb.container}>

                     <div className={style_nb.left}>
                      
                      <img src="https://cdn.fcglcdn.com/brainbees/images/n/fc_logo.png" alt="logo" onClick={ ()=> navigate('/')} />

                      <span className={style_nb.searchcontainer}>
                      <input type="text" placeholder='Search for a Category , Brand or Product' />
                      <IoIosSearch className={style_nb.searchicon}/>
                      </span>
                     </div>

                     <div className={style_nb.right}>
                         
                         {/* location */}
                       <div className={style_nb.selectLocation}>
                        
                        <VscLocation className={style_nb.loactionicon}/>
                        <span>Select Location</span>       
                       </div>   
                         <span className={style_nb.lati}>|</span>

                       <div className={style_nb.loginOther}>
                           
                       <span>Stores & Preschools</span>
                      <span className={style_nb.lati}>|</span>
                       <span>Support</span>
                       <span className={style_nb.lati}>|</span>
                       <span>Track Order</span>
                       <span className={style_nb.lati}>|</span>
                       <span>FirstCry Parenting</span>
                       <span className={style_nb.lati}>|</span>
                       <span>Login / Register</span>


                       </div> 
                       <span className={style_nb.lati}>|</span>
                       <div className={style_nb.shortlist}>
                      
                       <AiOutlineHeart className={style_nb.loactionicon}/>
                       <span>Shortlist</span>

                       </div>  
                       <span className={style_nb.lati}>|</span>

                       <div className={style_nb.cart}>
                             
                                       <div className={style_nb.childcartdiv}>
                                   <h3>{countcart}</h3>
                                <CgShoppingCart className={style_nb.carticon} onClick={()=> navigate("/cart")} />
                                     </div>
                                <span>Cart</span>

                       </div>  

                    </div>

         </div>




   </>
  )
}

export default Navbar