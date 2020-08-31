import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import * as Category from "./Category";
import * as Dish from "./Dish";
import * as Guest from "./Guest";
import * as Meal from "./Meal";

export const reducers = {
	category: Category.reducer,
	dish: Dish.reducer,
	guest: Guest.reducer,
	meal: Meal.reducer,
}

export const reduxStore = createStore(
	combineReducers(reducers),
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);