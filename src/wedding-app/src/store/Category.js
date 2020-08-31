import api from "../actions/api";

export const CATEGORY_ACTION_TYPE = {
	GET: "GET_CATEGORY",
	GET_ALL: "GET_ALL_CATEGORIES",
	CREATE: "CREATE_CATEGORY",
	UPDATE: "UPDATE_CATEGORY",
	DELETE: "DELETE_CATEGORY",
};

export const actionCreators = {
	get: (id) => (dispatch) => {
		api
			.Category()
			.getById(id)
			.then((response) => {
				dispatch({
					type: CATEGORY_ACTION_TYPE.GET,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
	},

	getAll: () => (dispatch) => {
		api
			.Category()
			.getAll()
			.then((response) => {
				dispatch({
					type: CATEGORY_ACTION_TYPE.GET_ALL,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
	},

	create: (category) => (dispatch) => {
		api
			.Category()
			.create(category)
			.then((response) => {
				dispatch({
					type: CATEGORY_ACTION_TYPE.CREATE,
					payload: category,
				});
			})
			.catch((error) => console.log(error));
	},

	update: (category) => (dispatch) => {
		api
			.Category()
			.update(category)
			.then((response) => {
				dispatch({
					type: CATEGORY_ACTION_TYPE.UPDATE,
					payload: category,
				});
			})
			.catch((error) => console.log(error));
	},

	delete: (id) => (dispatch) => {
		api
			.Category()
			.delete(id)
			.then((response) => {
				dispatch({
					type: CATEGORY_ACTION_TYPE.DELETE,
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
		sortOrder: 0,
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {

		case CATEGORY_ACTION_TYPE.GET:
			return {
				...state,
				data: action.payload,
			};

		case CATEGORY_ACTION_TYPE.GET_ALL:
			return {
				...state,
				list: [...action.payload],
			};

		case CATEGORY_ACTION_TYPE.CREATE:
			return {
				...state,
				data: action.payload,
			};
		case CATEGORY_ACTION_TYPE.UPDATE:
			return {
				...state,
				data: action.payload,
			};

		case CATEGORY_ACTION_TYPE.DELETE:
			return {
				...state,
				data: initialState.data,
				list: [state.list.filter((c) => c.id !== action.payload)],
			};

		default:
			return state;
	}
};
