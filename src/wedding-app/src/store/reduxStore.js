import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import * as Menu from "./Menu";
import * as Guest from "./Guest";

export const reducers = {
	menu: Menu.reducer,
	guest: Guest.reducer,
};

export const reduxStore = createStore(
	combineReducers(reducers),
	compose(
		applyMiddleware(thunk),
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);
