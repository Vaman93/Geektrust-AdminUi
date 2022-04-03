import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { AdminReducer } from "./Adminlist/reducer";

const reducer = AdminReducer;

export const store = createStore(reducer, applyMiddleware(thunk));
