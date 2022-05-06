import { createStore,applyMiddleware ,compose} from "redux";

import thunk from "redux-thunk";
import logger from 'redux-logger'
import rootReducerf from "./redux/combinereduer/index";


const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const middleware = [thunk]
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store=createStore(rootReducerf, enhancer)


export default store