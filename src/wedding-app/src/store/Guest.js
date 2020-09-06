import api from "../actions/api";

export const GUEST_ACTION_TYPE = {
	GET: "GET_GUEST",
	CONFIRM_INVITE: "CONFIRM_INVITE",
	REFUSE_INVITE: "REFUSE_INVITE",
	CONFIRM_ZAGS: "CONFIRM_ZAGS",
	REFUSE_ZAGS: "REFUSE_ZAGS",
	GET_MEAL: "GET_MEAL",
	CHOOSE_MEAL: "CHOOSE_MEAL",
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
					payload: id,
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
					payload: id,
				});
			})
			.catch((error) => console.log(error));
	},

	confirmZAGS: (id) => (dispatch) => {
		api
			.Guest()
			.confirmZAGS(id)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.CONFIRM_ZAGS,
					payload: id,
				});
			})
			.catch((error) => console.log(error));
	},

	refuseZAGS: (id) => (dispatch) => {
		api
			.Guest()
			.refuseZAGS(id)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.REFUSE_ZAGS,
					payload: id,
				});
			})
			.catch((error) => console.log(error));
	},

	getMeal: (id) => (dispatch) => {
		api
			.Guest()
			.getMeal(id)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.GET_MEAL,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
	},

	chooseMeal: (id, dishes) => (dispatch) => {
		console.log(dishes);
		api
			.Guest()
			.chooseMeal(id, dishes)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.CHOOSE_MEAL,
				});
			})
			.catch((error) => console.log(error));
	},
};

const initialState = {
	meal: [],
	guest: {
		id: "",
		name: "",
		message: "",
		isConfirmedInvite: false,
		isCanBeInZAGS: false,
		isConfirmedZAGS: false,
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GUEST_ACTION_TYPE.GET:
			return {
				...state,
				guest: action.payload,
			};

		case GUEST_ACTION_TYPE.CONFIRM_INVITE:
			return {
				...state,
				guest: {
					...state.guest,
					isConfirmedInvite: true,
				},
			};

		case GUEST_ACTION_TYPE.REFUSE_INVITE:
			return {
				...state,
				guest: {
					...state.guest,
					isConfirmedInvite: false,
				},
			};

		case GUEST_ACTION_TYPE.CONFIRM_ZAGS:
			return {
				...state,
				guest: {
					...state.guest,
					isConfirmedZAGS: true,
				},
			};

		case GUEST_ACTION_TYPE.REFUSE_ZAGS:
			return {
				...state,
				guest: {
					...state.guest,
					isConfirmedZAGS: false,
				},
			};

		case GUEST_ACTION_TYPE.GET_MEAL:
			return {
				...state,
				meal: action.payload,
			};

		default:
			return state;
	}
};
