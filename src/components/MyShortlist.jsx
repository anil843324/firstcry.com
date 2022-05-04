import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getShortItems} from "../redux/actions/index";
import style_s from "./MyShortlist.module.css"
import {RiDeleteBin6Line} from "react-icons/ri"
import { useNavigate } from 'react-router-dom';

const MyShortlist = () => {

     const navigate=useNavigate()
     const dispatch=useDispatch()
    const items = useSelector((state) => state.cartShortReducer.shortList);
    useEffect(() => {
        dispatch(getShortItems());
      }, []);

       console.log(items)
//  delet form list
const handleDeletelist = (id) => {
  fetch(`http://localhost:8080/shortList/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => dispatch(getShortItems()) ,console.log(id));
};








  return (
    <>
     <div className={style_s.container} >

         <div className={style_s.productContainer}>
          


               {
                   items.length ? <>
                   {
             items.map((ele,id)=>{

              return <div key={id} className={style_s.card}>
                  
                 
                  <img src={ele.img} alt="not found"  />

                   <div className={style_s.tiltediv}>
                        
                        <span className={style_s.title}>{ele.title}</span>
                        <span className={style_s.prize}>₹{ele.prize}</span>
                        <span className={style_s.mrps}>MRP ₹{ele.mrp} </span>

                        <div className={style_s.buttondiv}>
                        <button className={style_s.movetocartbtn} >MOVE TO CART</button>
                         <span className={style_s.dleicondiv} onClick={()=> handleDeletelist(ele.id)} >
                         <RiDeleteBin6Line  />
                         </span>
                        
                           </div>
                   </div>

                    


              </div>


             })   
            } 


                   </> :<>
                   <div className={style_s.emptydiv}>

<img src="https://cdn.fcglcdn.com/brainbees/checkout/emty-shortlist-img.png" alt="not found" />
 
 <span>No Product Shortlisted, Yet!</span>
 <button onClick={()=> {navigate('/')}}>START SHOPPING</button>

                       </div>

                   </>
               }

           
              {/*  for when shortlist is empty then work this div */}

               
                
         





         </div>




     </div>




    </>
  )
}

export default MyShortlist