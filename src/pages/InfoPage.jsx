import React, { useEffect, useState } from 'react'
import {BsHeart} from "react-icons/bs"
import style_i from "./InfoPage.module.css"
import {AiOutlineRight} from "react-icons/ai"
import {getCartItems ,getShortItems } from "../redux/actions/index";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
const InfoPage = () => {

  const dispatch=useDispatch()

   const {id}=useParams()
   console.log(id)
   const [data,setData]=useState({})
  
  // get to cart to check is avialbe or not in cart
  const items = useSelector((state) => state.cartShortReducer.cartList);
  const items2 = useSelector((state) => state.cartShortReducer.shortList);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  useEffect(() => {
    dispatch(getShortItems());
  }, []);
  

   
    console.log(items)
    console.log(items2)
 

 //  add to data in shortlist

 useEffect(() => {
   fetch(`http://localhost:8080/products/${id}`)
     .then((response) => response.json())
     .then((Data)=>setData(Data))
    
 }, []);

 
// add data 
  //  add data in cart
  const handleCart = (index) => {
     
     let x=items.find((ele) =>ele.id===index)

    if(x){
      alert("already in cart")
    }else{
      fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        dispatch(getCartItems());
      });
      alert("added in cart");
    }

   
  
 };

 //  add to data in shortlist
 const handleShortList = (index) => {

  let x=items2.find((ele) =>ele.id===index)

  if(x){
    alert("already in shortList")
  }else{
   fetch("http://localhost:8080/shortList", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
   }).then(() => {
     dispatch(getShortItems());
   });
   alert("added in shortList");
  }
 };



  return (
  <>

       <div className={style_i.BigContainer}>


         {/* left image part */}
              <div className={style_i.left}>

                 <img src={data.img} alt="not found" />
                

               <div className={style_i.btndiv}>
               
                   
                  <button className={style_i.cartbtn} onClick={ ()=> {handleCart(data.id)}}  >ADD TO CART</button>
                  <button className={style_i.shortlistbtn} onClick={()=>{handleShortList(data.id)}}> <BsHeart/> SHORTLIST</button>

               </div>



              </div>
    
         {/* Right info and tilte page */}


         <div className={style_i.right}>

           {/* tittle div */}
            <div className={style_i.titlediv}>

             <p>{data.title}</p>
              <span>6 to 12 Months, comfortable elastic waist leggings for girls and boys</span>
            </div>
     

            <hr  className={style_i.hr}/>

             {/* prize div */}
            <div className={style_i.prizediv}>
        
            <div className={style_i.child_prizediv}>
            <span className={style_i.prize}>₹ {data.prize}</span>
             <div>
            <span className={style_i.mrp_title}>MRP:</span>
            <span className={style_i.mrp}>₹ {data.mrp}</span>
            </div>
            <span className={style_i.offer}>(28% OFF)</span>
            </div>

            <p className={style_i.taxtesmrp}>MRP incl. all taxes, Add'l charges may apply on discounted price</p>
            </div>
            <div className={style_i.Clubdiv}>
             
               <div className={style_i.clubprizesmalldiv}>
                  <div className={style_i.clubprizediv}>
                      <img className={style_i.img} src="https://cdn.fcglcdn.com/brainbees/images/club_flag_listing_desktop.png" alt="logo" />
                      <span className={style_i.clubTitle}>Club Price:</span>
                      <span className={style_i.clubTitlepirze}>₹ {data.club_p}</span> 
                  </div>
                  <p className={style_i.savingclub}>₹ Add'l Club Savings: 15.98</p>
               </div>
              
               <span className={style_i.joinClub}>Join Club <AiOutlineRight/> </span>

            </div>

            <hr  className={style_i.hr}/>
            <div >




            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>














          </div>







       </div>


  </>
  )
}

export default InfoPage