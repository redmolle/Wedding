import axios from "axios";

const baseUrl = "http://192.168.0.111:5000/api/";

export default {
	Menu(url = baseUrl + "menu/") {
		return {
			categories: () => axios.get(url + "categories"),
			dishes: () => axios.get(url + "dishes"),
		};
	},

	Guest(url = baseUrl + "guest/") {
		return {
			get: (id) => axios.get(url + id),
			confirmInvite: (id) => axios.get(url + `invite/confirm/${id}`),
			refuseInvite: (id) => axios.get(url + `invite/refuse/${id}`),
			confirmZAGS: (id) => axios.get(url + `ZAGS/confirm/${id}`),
			refuseZAGS: (id) => axios.get(url + `ZAGS/refuse/${id}`),

			getMeal: (id) => axios.get(url + `meal/${id}`),
			chooseMeal: (id, dishes) => axios.post(url + `meal/${id}`, dishes),
		};
	},
};
