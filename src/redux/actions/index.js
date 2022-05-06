

  

 // data fro json to stroe list
export const getItems = (listData) => ({
  type: "GET_ITEMS",
  payload: listData,
});


//  get data for json
export const getCartItems =  () => {
  return (dispatch) => {
    fetch("http://localhost:8080/cart")
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
  fetch("http://localhost:8080/shortList")
    .then((response) => response.json())
    .then((data) => dispatch(getShortListItems(data)));
};
};