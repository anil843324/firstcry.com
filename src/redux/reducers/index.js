const initialState = {
    cartList: [],
    shortList:[],
  };
  
  const cartShortReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ITEMS":
        return {
          ...state,
          cartList:action.payload,
        };
        case "GET_SHORT_LIST_ITEMS":
        return {
          ...state,
          shortList:action.payload,
        };
      default:
        return state;
    }
  };
  
  export default cartShortReducer;
 
  
  // another reducer
  

