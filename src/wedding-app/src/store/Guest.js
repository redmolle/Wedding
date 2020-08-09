import api from "../actions/api";

export const GUEST_ACTION_TYPE = {
	GET: "GUEST_GET",
	CONFIRM_INVITE: "GUEST_CONFIRM_INVITE",
	REFUSE_INVITE: "GUEST_REFUSE_INVITE",
	CONFIRM_ZAGS: "GUEST_CONFIRM_ZAGS",
	REFUSE_ZAGS: "GUEST_REFUSE_ZAGS",
};

export const actionCreators = {
	get: (id) => (dispatch) => {
		api
			.Guest()
			.get(id)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.GET,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
	},

	confirmInvite: (id) => (dispatch) => {
		api
			.Guest()
			.confirmInvite(id)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.CONFIRM_INVITE,
				});
			})
			.catch((error) => console.log(error));
	},

	refuseInvite: (id) => (dispatch) => {
		api
			.Guest()
			.refuseInvite(id)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.REFUSE_INVITE,
				});
			})
			.catch((error) => console.log(error));
	},

	confirmZAGS: (id) => (dispatch) => {
		api
			.Guest()
			.confirmZags(id)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.CONFIRM_ZAGS,
				});
			})
			.catch((error) => console.log(error));
	},

	refuseZAGS: (id) => (dispatch) => {
		api
			.Guest()
			.refuseZags(id)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.REFUSE_ZAGS,
				});
			})
			.catch((error) => console.log(error));
	},
};

const initialState = {
	guest: { id: "", menu: [], name: "", status: "" },
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GUEST_ACTION_TYPE.GET:
			return {
				...state,
				guest: action.payload,
			};

		default:
			return state;
	}
};
