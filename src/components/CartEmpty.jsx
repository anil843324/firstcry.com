import React from 'react'
import { useNavigate } from 'react-router-dom'
import style_ce from "./CartEmpty.module.css"

const CartEmpty = () => {

     const navigate= useNavigate();

  return (
    <>
      <div className={style_ce.container}>
             
            <div className={style_ce.childcontainer} >
               
               <img src="https://cdn.fcglcdn.com/brainbees/checkout/emty-cart-img.jpg" alt="not found" />
            </div>

             <p>We recommend you to browse through our popular categories.</p>

                 <button onClick={()=>navigate('/')}>START SHOPPING</button>

      </div>
    
    
    </>
  )
}

export default CartEmpty