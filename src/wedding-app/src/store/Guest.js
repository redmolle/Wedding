import api from "../actions/api";
import {reducers} from './reduxStore'

export const GUEST_ACTION_TYPE = {
	GET: "GET_GUEST",
	GET_ALL: "GET_ALL_GUESTS",
	CREATE: "CREATE_GUEST",
	UPDATE: "UPDATE_GUEST",
	DELETE: "DELETE_GUEST",
	CONFIRM_INVITE: "CONFIRM_INVITE",
	REFUSE_INVITE: "REFUSE_INVITE",
	CONFIRM_ZAGS: "CONFIRM_ZAGS",
	REFUSE_ZAGS: "REFUSE_ZAGS",
};

export const actionCreators = {
	get: (id) => (dispatch) => {
		api
			.Guest()
			.getById(id)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.GET,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
	},

	getAll: () => (dispatch) => {
		api
			.Guest()
			.getAll()
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.GET_ALL,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
	},

	create: (guest) => (dispatch) => {
		api
			.Guest()
			.create(guest)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.CREATE,
					payload: guest,
				});
			})
			.catch((error) => console.log(error));
	},

	update: (guest) => (dispatch) => {
		api
			.Guest()
			.update(guest)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.UPDATE,
					payload: guest,
				});
			})
			.catch((error) => console.log(error));
	},

	delete: (id) => (dispatch) => {
		api
			.Guest()
			.delete(id)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.DELETE,
					payload: id,
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
			.confirmZAGS(id)
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
			.refuseZAGS(id)
			.then((response) => {
				dispatch({
					type: GUEST_ACTION_TYPE.REFUSE_ZAGS,
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
				data: action.payload,
			};

		case GUEST_ACTION_TYPE.GET_ALL:
			return {
				...state,
				list: [...action.payload],
			};

		case GUEST_ACTION_TYPE.CREATE:
			return {
				...state,
				data: action.payload,
			};
		case GUEST_ACTION_TYPE.UPDATE:
			return {
				...state,
				data: action.payload,
			};

		case GUEST_ACTION_TYPE.DELETE:
			return {
				...state,
				data: initialState.data,
				list: [state.dishes.filter((d) => d.id !== action.payload)],
			};

		case GUEST_ACTION_TYPE.CONFIRM_INVITE:
			return {
				...state,
				data: {
					...state.data,
					isConfirmedInvite: true,
				},
			};

		case GUEST_ACTION_TYPE.REFUSE_INVITE:
			return {
				...state,
				data: {
					...state.data,
					isConfirmedInvite: false,
				},
			};

		case GUEST_ACTION_TYPE.CONFIRM_ZAGS:
			return {
				...state,
				data: {
					...state.data,
					isConfirmedZAGS: true,
				},
			};

		case GUEST_ACTION_TYPE.REFUSE_ZAGS:
			return {
				...state,
				data: {
					...state.data,
					isConfirmedZAGS: false,
				},
			};

		default:
			return state;
	}
};
