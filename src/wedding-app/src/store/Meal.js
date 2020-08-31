import api from "../actions/api";

export const MEAL_ACTION_TYPE = {
	GET: "GET_MEAL",
	GET_BY_GUEST: "GET_MEALS_BY_GUEST",
	GET_ALL: "GET_ALL_MEALS",
	CREATE: "CREATE_MEAL",
	UPDATE: "UPDATE_MEAL",
    DELETE: "DELETE_MEAL",
    CHOOSE: "CHOOSE_MEAL"
};

export const actionCreators = {
	get: (id) => (dispatch) => {
		api
			.Meal()
			.getById(id)
			.then((response) => {
				dispatch({
					type: MEAL_ACTION_TYPE.GET,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
    },
    
    getByGuest: (id) => (dispatch) => {
		api
			.Meal()
			.getByGuest(id)
			.then((response) => {
				dispatch({
					type: MEAL_ACTION_TYPE.GET_BY_GUEST,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
	},

	getAll: () => (dispatch) => {
		api
			.Meal()
			.getAll()
			.then((response) => {
				dispatch({
					type: MEAL_ACTION_TYPE.GET_ALL,
					payload: response.data,
				});
			})
			.catch((error) => console.log(error));
	},

	create: (meal) => (dispatch) => {
		api
			.Meal()
			.create(meal)
			.then((response) => {
				dispatch({
					type: MEAL_ACTION_TYPE.CREATE,
					payload: meal,
				});
			})
			.catch((error) => console.log(error));
	},

	update: (meal) => (dispatch) => {
		api
			.Meal()
			.update(meal)
			.then((response) => {
				dispatch({
					type: MEAL_ACTION_TYPE.UPDATE,
					payload: meal,
				});
			})
			.catch((error) => console.log(error));
	},

	delete: (id) => (dispatch) => {
		api
			.Meal()
			.delete(id)
			.then((response) => {
				dispatch({
					type: MEAL_ACTION_TYPE.DELETE,
					payload: id,
				});
			})
			.catch((error) => console.log(error));
    },
    
    choose: (guestId, dishes) => (dispatch) => {
        api
        .Meal()
        .choose(guestId, dishes)
        .then((response) => {
            dispatch({
                type: MEAL_ACTION_TYPE.CHOOSE,
                payload: response.data
            })
        })
        .catch((error) => console.log(error));
    }
};

const initialState = {
	list: [],
	data: {
		id: "",
		guestId: "",
        dishId: ""
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		
		case MEAL_ACTION_TYPE.GET:
			return {
				...state,
				data: action.payload,
            };
            
            case MEAL_ACTION_TYPE.GET_BY_GUEST:
                return {
                    ...state,
                    list: [...action.payload],
                };

		case MEAL_ACTION_TYPE.GET_ALL:
			return {
				...state,
				list: [...action.payload],
			};

		case MEAL_ACTION_TYPE.CREATE:
			return {
				...state,
				data: action.payload,
            };
            
		case MEAL_ACTION_TYPE.UPDATE:
			return {
				...state,
				data: action.payload,
			};

		case MEAL_ACTION_TYPE.DELETE:
			return {
				...state,
				data: initialState.data,
				list: [state.list.filter((d) => d.id !== action.payload)],
            };
            
        case MEAL_ACTION_TYPE.CHOOSE:
            return {
                ...state,
                list: action.payload
            }

		default:
			return state;
	}
};
