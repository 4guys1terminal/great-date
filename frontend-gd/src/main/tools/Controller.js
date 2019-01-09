import request from './request.js';

class Controller {
	/*
	USERS
	*/
	static fetchAllUsers() {
		return request('/api/users', 'GET')
			.catch(err => {
				throw new Error(err);
			})
	}

	static createUser(params) {
		return request('/api/users', 'POST', params)
			.catch(err => {
				throw new Error(err);
			})
	}


	/*
	DATES
	*/
	static fetchAllActivities() {
		return request('/api/activities', 'GET')
			.catch(err => {
				throw new Error(err);
			})
	}

	static fetchApprovedActivities() {
		return request(`/api/approvedActivities`)
			.catch(err => {
				throw new Error(err);
			})

	}

	static fetchActivity(id) {
		return request(`/api/activities/${id}`)
			.catch(err => {
				throw new Error(err);
			})
	}

	static createNewActivity(dateData) {
		return request('/api/activities', 'POST', dateData)
			.catch(err => {
				throw new Error(err);
			})
	}


	static fetchActivityByTags(form) {
		return request('/api/browse', 'POST', form)
			.catch(err => {
				throw new Error(err);
			})
	}

	// static editDate() {

	// }

	static updateDateStatus(id, dateStatus) {
		return request(`/api/activities/status/${id}`, 'PUT', {dateStatus})
			.catch(err => {
				throw new Error(err);
			})
	}


	/*
	TAGS
	*/
	static fetchTags() {
		return request(`/api/tags`)
			.catch(err => {
				throw new Error(err);
			})
	}

	/*
	LOCATIONS
	*/
	static fetchLocations() {
		return request(`/api/locations`)
			.catch(err => {
				throw new Error(err);
			})
	}

	/*
	Handle Date Generator?
	*/
	static handleDateGenerator(params) {
		return request('/api/home', 'POST', params)
			.catch(err => {
				throw new Error(err)
			})
		}

		static logUserIn(credentials) {
			return request('/api/sessions/new', 'POST', credentials)
				.catch(err => {
					throw new Error(err)
				})
		}

}

export default Controller;
