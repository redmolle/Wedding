import api from "../actions/api";

export const MENU_ACTION_TYPE = {
	CHOOSE_MENU: "CHOOSE_MENU",
};

export const actionCreators = {
	choose: (id) => (dispatch) => {
		api
			.Menu()
			.choose(id)
			.then((response) => {
				dispatch({
					type: MENU_ACTION_TYPE.CHOOSE_MENU,
				});
			})
			.catch((error) => console.log(error));
	},
};

const initialState = {
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
