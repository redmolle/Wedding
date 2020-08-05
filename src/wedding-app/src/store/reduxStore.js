import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import * as Guest from "./Guest";
import * as Category from "./Category";
import * as Menu from "./Menu";

export const reducers = {
	guest: Guest.reducer,
	category: Category.reducer,
	menu: Menu.reducer,
}

export const reduxStore = createStore(
	combineReducers(reducers),
	compose(
		applyMiddleware(thunk),
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);