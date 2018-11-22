//TODO:
import request from '../tools/request.js';


class UserController {
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
}

export default UserController;
