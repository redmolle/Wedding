import api from "../actions/api";

export const DISH_ACTION_TYPE = {
	GET: "GET_DISH",
	GET_ALL: "GET_ALL_DISHES",
	CREATE: "CREATE_DISH",
	UPDATE: "UPDATE_DISH",
	DELETE: "DELETE_DISH",
};

export const actionCreators = {
	get: (id) => (dispatch) => {
		api
			.Dish()
			.getById(id)
			.then((response) => {
				dispatch({
					type: DISH_ACTION_TYPE.GET,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
	},

	getAll: () => (dispatch) => {
		api
			.Dish()
			.getAll()
			.then((response) => {
				dispatch({
					type: DISH_ACTION_TYPE.GET_ALL,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
	},

	create: (dish) => (dispatch) => {
		api
			.Dish()
			.create(dish)
			.then((response) => {
				dispatch({
					type: DISH_ACTION_TYPE.CREATE,
					payload: dish,
				});
			})
			.catch((error) => console.log(error));
	},

	update: (dish) => (dispatch) => {
		api
			.Dish()
			.update(dish)
			.then((response) => {
				dispatch({
					type: DISH_ACTION_TYPE.UPDATE,
					payload: dish,
				});
			})
			.catch((error) => console.log(error));
	},

	delete: (id) => (dispatch) => {
		api
			.Dish()
			.delete(id)
			.then((response) => {
				dispatch({
					type: DISH_ACTION_TYPE.DELETE,
					payload: id,
				});
			})
			.catch((error) => console.log(error));
	},
};

const initialState = {
	list: [],
	data: {
		id: "",
		name: "",
        categoryId: ""
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		
		case DISH_ACTION_TYPE.GET:
			return {
				...state,
				data: action.payload,
			};

		case DISH_ACTION_TYPE.GET_ALL:
			return {
				...state,
				list: [...action.payload],
			};

		case DISH_ACTION_TYPE.CREATE:
			return {
				...state,
				data: action.payload,
			};
		case DISH_ACTION_TYPE.UPDATE:
			return {
				...state,
				data: action.payload,
			};

		case DISH_ACTION_TYPE.DELETE:
			return {
				...state,
				data: initialState.data,
				list: [state.list.filter((d) => d.id !== action.payload)],
			};

		default:
			return state;
	}
};
