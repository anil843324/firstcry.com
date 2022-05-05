import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCartItems ,getShortItems } from "../redux/actions";
import { ImLocation } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import style_c from "./CartPage.module.css";
import CartEmpty from "../components/CartEmpty";
import MyShortlist from "../components/MyShortlist";
const CartPage = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cartShortReducer.cartList);
  const [togle, setTogle] = useState(true);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  // MRP
  let mrp = 0;
  let discount = 0;
  let gst = 0;
  let subtotal = 0;
  items.map((ele) => {
    mrp = mrp + ele.mrp;
    discount = discount + Math.round(ele.mrp - ele.prize);
    gst = gst + Math.round((ele.prize * 12) / 100);
    subtotal = subtotal + Math.round(gst + ele.prize);
  });

  //  delete from
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/cart/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => dispatch(getCartItems()));
  };

//  move to short list 

const handleMove=(img,title,prize,mrp,club_p,id)=>{
        
  let obj={
    img,
    title,
    prize,
    mrp,
    club_p
  }
   console.log(obj)
 
    fetch("http://localhost:8080/shortList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then( ()=>dispatch(getCartItems(),handleDelete(id,dispatch(getShortItems()))));
     alert("added to shortlist")    
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
            {items.map((ele, id) => {
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
                         onClick={()=> handleMove(ele.img,ele.title,ele.prize,ele.mrp,ele.club_p,ele.id)}
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
          <div className={style_c.delivery_address}>ADD DELIVERY ADDRESS</div>
          <div className={style_c.placetodelivery}>
            <div className={style_c.total}>
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
           

       


      </div>
    </>
  );
};

export default CartPage;
