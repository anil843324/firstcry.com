import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCartItems ,getShortItems } from "../redux/actions";
import { ImLocation } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import style_c from "./CartPage.module.css";
import { Accordion } from '@mantine/core';
import CartEmpty from "../components/CartEmpty";
import MyShortlist from "../components/MyShortlist";

import {ImCreditCard} from "react-icons/im"

//  imported from library
import { Modal } from '@mantine/core';
import axios from "axios";


// end
const CartPage = () => {
  const dispatch = useDispatch();
  const [toggle,setToggle]=useState(true);
  const [opened, setOpened] = useState(false);
  const [cartData,setCartData]=useState([])
  
  // form state
const [state, setState] = useState("");
const [address, setAddress] = useState("");
const [pin, setPin] = useState("");
const [name, setName] = useState("");
const [mnumber, setMnumber] = useState("");
const [ftogal,setFtogal]=useState(false)



//  for payment page state
const [cardNumber,setCardNumber]=useState()
const [cardName,setCardName]=useState('')
const [cvv,setCvv]=useState();
const [month,setMonth]=useState()
const [year,setYear]=useState()
  //  for chkar usin state
  
  useEffect(()=>{
    fetch("https://immense-journey-49430.herokuapp.com/cart")
    .then((response) => response.json())
    .then((data) => setCartData(data));
  

  },[toggle])



  
  const items = useSelector((state) => state.cartShortReducer.cartList);
 
  console.log("anil kumar",items)
   
  // console.log("reducer"+items)
  const [togle, setTogle] = useState(true);

  useEffect(() => {
    dispatch(getCartItems());
  }, [toggle]);



//  for quantity product start

const handleIncrement=(cart_id)=>{
 
  setCartData(cartData=>
     cartData.map((item)=>
      cart_id===item.id ? axios.patch(`https://immense-journey-49430.herokuapp.com/cart/${cart_id}`,{q_cart:item.q_cart+(item.q_cart<10 ?1:0)}).then():item
     )
    )
    setToggle(!toggle)

    // {...item,q_cart:item.q_cart +(item.q_cart<10 ?1:0)}
   
    

}
const handleDecrement=(cart_id)=>{


  setCartData(cartData=>
    cartData.map((item)=>
     cart_id===item.id ? axios.patch(`https://immense-journey-49430.herokuapp.com/cart/${cart_id}`,{q_cart:item.q_cart-(item.q_cart>1 ?1:0)}).then():item
    )
   )
   setToggle(!toggle)
 
  

}







//  for quantity product end








const [openedpayment,setOpenedpayment]=useState(false)
  // MRP
  let mrp = 0;
  let discount = 0;
  let gst = 0;
  let subtotal = 0;
  cartData.map((ele) => {
    mrp = mrp + ele.mrp*ele.q_cart
    discount = discount + Math.round(ele.mrp - ele.prize)*ele.q_cart;
    gst = gst + Math.round((ele.prize * 12) / 100)*ele.q_cart;
    subtotal = subtotal + Math.round(gst + ele.prize)*ele.q_cart;
  });

  //  delete from
  const handleDelete = (id) => {
    fetch(`https://immense-journey-49430.herokuapp.com/cart/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => dispatch(getCartItems()));
      setToggle(!toggle)
  };

//  move to short list 

const handleMove=(img,title,prize,mrp,club_p,id,q_cart)=>{
        
  let obj={
    img,
    title,
    prize,
    mrp,
    club_p,
    id,
    q_cart
  }
   console.log(obj)
 
    fetch("https://immense-journey-49430.herokuapp.com/shortList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then( ()=>dispatch(getCartItems(),handleDelete(id,dispatch(getShortItems()))));
     alert("added to shortlist")    
}

//  from 

const handleSubmit = (event) => {
  event.preventDefault();

  if (!state || !address || !pin || !name || !mnumber) {
    alert("don't be over smart fill the data");
  } else {
    
    setFtogal(!ftogal)
    setOpened(!opened)
    setToggle(!toggle)
   
  }
};

const handlePayment=(event)=>{
  event.preventDefault();
  if (!cardNumber || !cardName || !month || !year || !cvv ) {
    alert("don't be over smart fill the data");
  } else {
     
    alert("Your payment has been successfull")
    setOpenedpayment(!openedpayment)
    setToggle(!toggle)
   
  }
     
}




  return (
    <>


      <div className={style_c.container}>


         
      <div className={style_c.buttondiv}>
              <div className={style_c.child_div_button}>
                <button
                  className={style_c.cartbutton}
                  onClick={() => {
                    setTogle(!togle);
                  }}
                >
                  Shopping Cart{" "}
                  <span className={style_c.itemscount}> ({items.length})</span>{" "}
                </button>
                <button
                  className={style_c.shortlistbtn}
                  onClick={() => {
                    setTogle(!togle);
                  }}
                >
                  My Shortlist
                </button>
              </div>
      </div> 

         {
           togle ? <>
           <div className={style_c.smalldiv}>
          <div className={style_c.leftdiv}>

            {/*  top button div */}
            <div className={style_c.buttondiva}>

            </div>
        
            {/* button div end */}

            {/* <div className={style_c.EarnedCash}>
                Net Loyalty Cash Earned: ₹2
                <p>[?]</p>
              </div> */}

            {/*  end button div */}
            {/* Delivery div */}

            {items.length ? (
              <>
                <div className={style_c.pincodediv}>
                  <div className={style_c.loactiondiv}>
                    <ImLocation className={style_c.loactionicon} />
                    <span>Delivery Pincode:</span>

                    <div className={style_c.inputdivhr}>
                      <input type="text" />
                      <div></div>
                    </div>
                  </div>

                  <button className={style_c.applybutton}>Apply</button>
                </div>
              </>
            ) : (
              <CartEmpty />
            )}
            {/*  end delivery div */}

            {/* cart compenent */}
            {cartData.map((ele, id) => {
              return (
                <div className={style_c.cart_container} key={id}>
                  <div className={style_c.imgdiv}>
                    <div className={style_c.top_div}>
                      <img src={ele.img} alt="not found" />

                      <div className={style_c.titlediv}>
                        <span className={style_c.titlespan}>{ele.title}</span>
                        <span className={style_c.sizespan}>
                          Size: <span>4-5Y</span>{" "}
                        </span>
                        <span className={style_c.sizespan}>
                          Fabric: <span>Cotton</span>{" "}
                        </span>

                          
                         <div className={style_c.quantitydiv}>
                          
                            <button onClick={()=>handleIncrement(ele.id)}>+</button>
                              
                              <div className={style_c.quantity} >
                                {ele.q_cart}
                              </div>

                             <button onClick={()=>handleDecrement(ele.id)}>-</button>
                         </div>



                      </div>
                    </div>
                    <hr />
                    <div className={style_c.botom_div}>
                      <span className={style_c.deletespan}>
                        <RiDeleteBin6Line
                          className={style_c.icondel_heart}
                          onClick={() => handleDelete(ele.id)}
                        />
                        <span
                        
                        >REMOVE</span>
                      </span>
                      <div></div>
                      <span className={style_c.deletespan}>
                        <AiOutlineHeart className={style_c.icondel_heart}
                         onClick={()=> handleMove(ele.img,ele.title,ele.prize,ele.mrp,ele.club_p,ele.id,ele.q_cart)}
                         />
                        <span
                        
                        >MOVE TO SHORTLIST</span>
                      </span>
                    </div>
                    <hr className={style_c.hrline} />
                  </div>
                  <div className={style_c.line}></div>

                  <div className={style_c.prizediv}>
                    <span className={style_c.price}>
                      ₹ <b>{ele.prize}</b>{" "}
                    </span>
                    <span className={style_c.mrp}>
                      MRP ₹ <span>{ele.mrp}</span>{" "}
                    </span>
                    <span className={style_c.clubimg}>
                      {" "}
                      <img
                        src="https://cdn.fcglcdn.com/brainbees/checkout/clublogo.png"
                        alt="not found"
                      />{" "}
                      Club Prize
                    </span>
                    <span className={style_c.clubprice}>₹{ele.club_p}</span>
                    <p>MRP includes all taxes</p>
                    <p>
                      {" "}
                      Earn Loyality Cash: ₹2 <b>[?]</b>{" "}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* <hr className={style_c.hrline} /> */}

            {/* end component */}
          </div>
          {items.length ? (
            <div className={style_c.rightdiv}>
              <span className={style_c.paymentinfo}>Payment Information</span>
              <span className={style_c.valueof_p}>
                Value of Product(s) <span>₹{mrp}</span>{" "}
              </span>
              <span className={style_c.discount}>
                Discount(-) <span>₹{discount}</span>
              </span>
              <span className={style_c.gst}>
                {" "}
                Estimated GST (+)
                <AiOutlineExclamationCircle className={style_c.gsticon} />{" "}
                <span>₹{gst}</span>
              </span>
              <span className={style_c.shipping}>
                Shipping (+) <span>FREE</span>
              </span>
              <div className={style_c.hrtag}></div>
              <span className={style_c.subtotal}>
                Sub Total <span>₹{subtotal}</span>
              </span>
              <div className={style_c.hrtag}></div>

              <span className={style_c.finalPayment}>
                Final Payment <span>₹{subtotal}</span>
              </span>
            </div>
          ) : (
            <div></div>
          )}
        </div>

         {
           togle ? <>

           {
             items.length ? <>
             <div className={style_c.deliverydiv}>
          <div className={style_c.delivery_address}  onClick={()=> setOpened(!opened)}  >ADD DELIVERY ADDRESS</div>
          <div className={style_c.placetodelivery}  onClick={()=> setOpenedpayment(!openedpayment)}  style={{backgroundColor: ftogal ? "#FF7043":"gray"}}>
            <div className={style_c.total} >
              <span className={style_c.totoalspan}>Total</span>
              <span className={style_c.totoalp}>₹ {subtotal}</span>
            </div>
            <span className={style_c.place_order}>PLACE ORDER</span>
          </div>
        </div>

             </>: <></>
           }
          
           </> :<></>
         }
        

           </> : <MyShortlist/>
         }

            {/*  from  */}
            
            <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Address!"
         className={style_c.titleform}
      >
        
        <form onSubmit={handleSubmit} className={style_c.form} >
        <div className={style_c.divform}>
        <label htmlFor="name" className={style_c.lableform}>Name</label>
        <input
          type="text"
          name="state"
          value={name}
          placeholder='Enter name'
          onChange={(event) => setName(event.target.value)}
        />
        </div>
        <br />
        <div className={style_c.divform}>
        <label htmlFor="state" className={style_c.lableform}>Mobile No.</label>
        <input
          type="number"
          name="state"
          value={mnumber}
          placeholder='Mobile no.'
          onChange={(event) => setMnumber(event.target.value)}
        />
        </div>
        <br />
       <div className={style_c.divform}>
        <label htmlFor="state" className={style_c.lableform}>State</label>
        <input
          type="text"
          name="state"
          value={state}
          placeholder='Enter state'
          onChange={(event) => setState(event.target.value)}
        />
        </div>
        <br />
           <div className={style_c.divform}>
        <label htmlFor="address" className={style_c.lableform}>Address</label>
        <input
          type="text"
          name="address"
          value={address}
          placeholder='Enter address'
          onChange={(event) => setAddress(event.target.value)}
        />
        </div>
        <br />

         <div className={style_c.divform}>
        <label htmlFor="pin" className={style_c.lableform}>Pin</label>
        <input
          type="number"
          name="pin"
          value={pin}
          placeholder='Enter pin'
          onChange={(event) => setPin(event.target.value)}
        />
        </div>
        <br />

        <input type="submit"  className={style_c.submitbtn}/>
      </form>

         
      </Modal>
     {/* payment form */}
        

        <Modal
        opened={openedpayment}
        onClose={() => setOpenedpayment(false)}
        title="Introduce yourself!"
      >
        {/* Modal content */}
     



      {/* <div className={style_c.paymentDiv}> */}
     <Accordion iconPosition="right">
      <Accordion.Item label="CREDIT/DEBIT CARDS"  >
      {/* <ImCreditCard/> */}
       <h4>Enter  Your Card Details</h4>

       <form className={style_c.form} >
        <div className={style_c.divform}>
        <label htmlFor="cardNumber" className={style_c.lableform}>Card Number</label>
        <input
          type="number"
          name="cardNumber"
          value={cardNumber}
          placeholder='Card number'
          onChange={(event) => setCardNumber(event.target.value)}
        />
        </div>
        <br />
        <div className={style_c.divform}>
        <label htmlFor="cardName" className={style_c.lableform}>Name on Card</label>
        <input
          type="text"
          name="cardName"
          value={cardName}
          placeholder='Name on card'
          onChange={(event) => setCardName(event.target.value)}
        />
        </div>
        <br />
           <div className={style_c.monthyeardiv}>
        
           <div className={style_c.childmonthdiv}>
           <input 
           placeholder="Month"
           value={month}
           onChange={(event) => setMonth(event.target.value)}
           type="number" />
            <div className={style_c.hrdiv}></div>
            </div>

            <div className={style_c.childmonthdiv}>
           <input 
           placeholder="Year"
           value={year}
           onChange={(event) => setYear(event.target.value)}
           type="number" />
            <div className={style_c.hrdiv}></div>
            </div>

            <div className={style_c.childmonthdiv}>
           <input 
           placeholder="CVV"
           value={cvv}
           onChange={(event) => setCvv(event.target.value)}
           type="number" />
           <div className={style_c.hrdiv}></div>
           </div>

           </div>



        <div className={style_c.delivery_address} 
          onClick={ handlePayment}
        >PAY NOW ₹{ subtotal}</div>
      </form>
        

      </Accordion.Item>

      
    </Accordion>

      {/* </div> */}

      </Modal> 
       


      </div>
    </>
  );
};

export default CartPage;
