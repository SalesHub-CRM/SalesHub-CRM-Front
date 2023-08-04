import {applyMiddleware, createStore} from "redux";
import Reducers from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import Middleware from 'redux-thunk';

const initialState={

}

const store = createStore(
    Reducers,
    initialState,
    composeWithDevTools(applyMiddleware(Middleware))

)

export default store;