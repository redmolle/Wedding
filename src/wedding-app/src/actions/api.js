import axios from "axios";

const baseUrl = "http://localhost:5000/";

export default {

	Category(url = baseUrl + 'api/category/') {
		return {
			getById: (id) => axios.get(url + id),
			getAll: () => axios.get(url + 'all'),
			create: (category) => axios.post(url, category),
			update: (category) => axios.put(url, category),
			delete: (id) => axios.delete(url + id)
		}
	},

	Dish(url = baseUrl + 'api/dish/') {
		return {
			getById: (id) => axios.get(url + id),
			getAll: () => axios.get(url + 'all'),
			create: (dish) => axios.post(url, dish),
			update: (dish) => axios.put(url, dish),
			delete: (id) => axios.delete(url + id)
		}
	},

	Guest(url = baseUrl + 'api/guest/') {
		return {
			getById: (id) => axios.get(url + id),
			getAll: () => axios.get(url + 'all'),
			create: (guest) => axios.post(url, guest),
			update: (guest) => axios.put(url, guest),
			delete: (id) => axios.delete(url + id),
			confirmInvite: (id) => axios.get(url + `invite/confirm/${id}`),
			refuseInvite: (id) => axios.get(url + `invite/refuse/${id}`),
			confirmZAGS: (id) => axios.get(url + `ZAGS/confirm/${id}`),
			refuseZAGS: (id) => axios.get(url + `ZAGS/refuse/${id}`),
		}
	},

	Meal(url = baseUrl + 'api/meal/') {
		return {
			getById: (id) => axios.get(url + id),
			getByGuest: (guestId) => axios.get(url + `guest/${guestId}`),
			getAll: () => axios.get(url + 'all'),
			create: (meal) => axios.post(url, meal),
			update: (meal) => axios.put(url, meal),
			delete: (id) => axios.delete(url + id),
			choose: (id, dishes) => axios.post(url + `choose/${id}`, dishes)
		}
	}
};
