// NOTE: This is a general request function to handle all of our API calls.

const API_URL = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000';
// TODO: this is going to have to change at some point, potentially using webpack configs?

const request = (path, method, body) => {
	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}

	return new Promise((resolve, reject) => {
		fetch(`${API_URL}${path}`, {
			method: method || 'GET',
			headers,
			body: body && JSON.stringify(body),
		})
			.then(response => {
				return response.json()
				.then(res => {
					resolve(res)
				})
			})
			.catch(err => {
				reject(err);
			})
	});
};

export default request;
