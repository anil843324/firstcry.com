import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style_p from "./Products.module.css";
import { AiOutlineRight } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { getCartItems, getShortItems } from "../redux/actions/index";
import { addCart, addShortList } from "../redux/actions";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [sortData, setSortData] = useState("");

  const navigate = useNavigate();
  const { ctegory_type } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [bannerTitle, setBannerTitle] = useState({ title: "", bannerimg: "" });
  const dispatch = useDispatch();

  //  add data in cart

//  checking data avilable or not in cart or shortlitst
 // get to cart to check is avialbe or not in cart
 
  //  checking data avialibe or not cart or shortlist
 // get to cart to check is avialbe or not in cart
 const items = useSelector((state) => state.cartShortReducer.cartList);
 const items2 = useSelector((state) => state.cartShortReducer.shortList);
 useEffect(() => {
   dispatch(getCartItems());
 }, []);
 useEffect(() => {
   dispatch(getShortItems());
 }, []);

  
  console.log("items",items)

 
    
  const handleCart = (img, title, size, prize, mrp, club_p, id,q_cart) => {
     
     console.log("index",id)
    let x=items.find((ele) =>ele.id===id)

    if(x){
      alert("already in cart")
    }else{
      fetch("https://immense-journey-49430.herokuapp.com/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img,
          title,
          size,
          prize,
          mrp,
          club_p,
          id,
          q_cart
        
        }),
      }).then(() => {
        dispatch(getCartItems());
      });
      alert("added in cart");
    }
  };



  //  add to data in shortlist
  const handleShortList = (img, title, size, prize, mrp, club_p, id,q_cart) => {


    let x=items2.find((ele) =>ele.id===id)

    if(x){
      alert("already in shortList")
    }else{
   
      fetch("https://immense-journey-49430.herokuapp.com/shortList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img,
         title,
         size,
        prize,
        mrp,
        club_p,
        id,
        q_cart
        }),
      }).then(() => {
        dispatch(getShortItems());
      });
      alert("added in shortList");
    }
  };

  //  get data from products
  useEffect(() => {
    fetch("https://immense-journey-49430.herokuapp.com/products")
      .then((response) => response.json())
      .then((data) => {
        let filterData = data.filter(
          (item) => item.ctegory_type === ctegory_type
        );
        if (sortData === "lowtohigh") {
          setProducts(filterData.sort((a, b) => a.prize - b.prize));
        } else if (sortData === "hightolow") {
          setProducts(filterData.sort((a, b) => b.prize - a.prize));
        } else {
          setProducts(filterData);
        }
      });

    console.log(sortData);
  }, [sortData]);

  //  get data from ctegory
  useEffect(() => {
    fetch("https://immense-journey-49430.herokuapp.com/ctegory")
      .then((response) => response.json())
      .then((data) => {
        setCategoryData(data);

        let filterCategory = data.filter(
          (item) => item.ctegory_type === ctegory_type
        )[0];
        // console.log(filterCategory)
        setBannerTitle({
          title: filterCategory.title,
          bannerimg: filterCategory.bannerimg,
        });
      });
  }, []);

  const navigater = (id) => {
    navigate(`${id}`);
  };




  return (
    <>
      <div className={style_p.BigContainer}>

        <div className={style_p.bannerdiv}>
          <img src={bannerTitle.bannerimg} alt="bannerimg" />
        </div>

        <div className={style_p.filter_div}>

          <div className={style_p.Sort}>
            <p>{bannerTitle.title}</p>

            <div className={style_p.childsortdiv}>
            
              <span>Sort by:</span>
              <select
                name=""
                id=""
                className={style_p.select}
                onChange={(e) => setSortData(e.target.value)}
              >
                <option value=""></option>
                <option value="lowtohigh">Low To High</option>
                <option value="hightolow">High To Low</option>
                <option value="">New Arrivals</option>
                <option value="">Best Seller</option>
                <option value="">Discount</option>

                <option value="">Name</option>
              </select>
            </div>
          </div>
          <div className={style_p.filter}>
            <span>Filter by:</span>
            <button>Subcategory</button>
            <button>Discount</button>
            <button>Age</button>
            <button>Gender</button>
            <button>Colors</button>
          </div>
          <div className={style_p.pincode}>
            <div className={style_p.child_pincode}>
              <input type="number" placeholder="Enter Pin Code" />
              <span>CHECK</span>
            </div>
          </div>
        </div>
        {/*  for data card */}
        <div className={style_p.smallCardContaienr}>
          {(products || []).map((ele, index) => {
            return (
              <div key={index} className={style_p.s_card}>
                {/* image */}
                <img
                  src={ele.img}
                  className={style_p.img}
                  alt="not found"
                  onClick={() => navigater(ele.id)}
                />

                {/* title */}
                <div className={style_p.title_div}>
                  <p className={style_p.titletext}>{ele.title}</p>
                  <p className={style_p.sizetext}>{ele.size}</p>

                  <div className={style_p.prizediv}>
                    <p className={style_p.prizess}>??? {ele.prize}</p>
                    <p>|</p>
                    <p className={style_p.prize_marp}>??? {ele.mrp}</p>
                  </div>

                  <span className={style_p.clubprize}>
                    {" "}
                    Club Prize: ???{ele.club_p} <AiOutlineRight />{" "}
                  </span>
                </div>

                <div className={style_p.buttondiv}>
                  <button
                    className={style_p.addtocart}
                    onClick={() =>
                      handleCart(
                        ele.img,
                        ele.title,
                        ele.size,
                        ele.prize,
                        ele.mrp,
                        ele.club_p,
                        ele.id,
                        ele.q_cart
                      )
                    }
                  >
                    ADD TO CART
                  </button>
                  <button
                    className={style_p.sortlist}
                    onClick={() =>
                      handleShortList(
                        ele.img,
                        ele.title,
                        ele.size,
                        ele.prize,
                        ele.mrp,
                        ele.club_p,
                        ele.id,
                        ele.q_cart
                      )
                    }
                  >
                    SHORTLIST
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
