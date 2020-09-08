import api from "../actions/api";

export const MENU_ACTION_TYPE = {
	GET_CATEGORY: "GET_CATEGORY",
	GET_DISHES: "GET_DISHES",
};

export const actionCreators = {
	getCategories: () => (dispatch) => {
		api
			.Menu()
			.categories()
			.then((response) => {
				dispatch({
					type: MENU_ACTION_TYPE.GET_CATEGORY,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
	},

	getDishes: () => (dispatch) => {
		api
			.Menu()
			.dishes()
			.then((response) => {
				dispatch({
					type: MENU_ACTION_TYPE.GET_DISHES,
					payload: response.data,
				});
			});
	},
};

const initialState = {
	categories: [],
	dishes: [],
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case MENU_ACTION_TYPE.GET_CATEGORY:
			return {
				...state,
				categories: action.payload,
			};

		case MENU_ACTION_TYPE.GET_DISHES:
			return {
				...state,
				dishes: action.payload,
			};

		default:
			return state;
	}
};
