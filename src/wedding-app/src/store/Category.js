import api from "../actions/api";

export const CATEGORY_ACTION_TYPE = {
	GET_ALL: "GET_ALL_CATEGORIES"
};

export const actionCreators = {
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
	}
};

const initialState = {
	categories: [],
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {

		case CATEGORY_ACTION_TYPE.GET_ALL:
            return {
				...state,
				categories: [...action.payload],
            };

		default:
			return state;
	}
};
