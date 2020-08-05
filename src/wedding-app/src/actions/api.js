import axios from "axios";

const baseUrl = {
	guest: "http://localhost:5000/api/guest/",
	menu: "http://localhost:5000/api/menu/",
	category: "http://localhost:5000/api/category/",
};

export default {
	Guest(url = baseUrl.guest) {
		return {
			get: (id) => axios.get(url + id),
			confirmInvite: (id) => axios.get(url + `confirmInvite/${id}`),
			confirmZags: (id) => axios.get(url + `confirmZAGS/${id}`),
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
