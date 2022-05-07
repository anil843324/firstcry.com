

  

 // data fro json to stroe list
export const getItems = (listData) => ({
  type: "GET_ITEMS",
  payload: listData,
});


//  get data for json
export const getCartItems =  () => {
  return (dispatch) => {
    fetch("https://immense-journey-49430.herokuapp.com/cart")
      .then((response) => response.json())
      .then((data) => dispatch(getItems(data)));
  };
};

//  for shortlsit item to get data

// this return object
export const getShortListItems = (listData) => ({
type: "GET_SHORT_LIST_ITEMS",
payload: listData,
});


//  this return function
export const getShortItems = () => {
return (dispatch) => {
  fetch("https://immense-journey-49430.herokuapp.com/shortList")
    .then((response) => response.json())
    .then((data) => dispatch(getShortListItems(data)));
};
};