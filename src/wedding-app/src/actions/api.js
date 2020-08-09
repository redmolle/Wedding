import axios from "axios";

const baseUrl = {
	guest: "http://192.168.0.111:5000/api/guest/",
	menu: "http://192.168.0.111:5000/api/menu/",
	category: "http://192.168.0.111:5000/api/category/",
};

export default {
	Guest(url = baseUrl.guest) {
		return {
			get: (id) => axios.get(url + id),
			confirmInvite: (id) => axios.get(url + `confirmInvite/${id}`),
			refuseInvite: (id) => axios.get(url + `refuseInvite/${id}`),
			confirmZags: (id) => axios.get(url + `confirmZAGS/${id}`),
			refuseZags: (id) => axios.get(url + `refuseZAGS/${id}`),
		};
	},

	Menu(url = baseUrl.menu) {
		return {
			choose: (id) => axios.get(url + `choose/${id}`),
		};
	},

	Category(url = baseUrl.category) {
		return {
			getAll: () => axios.get(url + "all"),
		};
	},
};
