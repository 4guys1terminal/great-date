import request from '../tools/request.js';


class DateController {
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
}

export default DateController;
