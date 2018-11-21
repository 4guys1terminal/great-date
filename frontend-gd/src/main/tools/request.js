// NOTE: This is a general request function to handle all of our API calls.
// May need to play with this a little bit to fit our API response structure

const API_URL = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000/';
// TODO: this is going to have to change at some point, potentially using webpack configs?

const request = (path, method, body) => {
	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}

	// space to adjust headers as need be, probably for auth purposes down the line

	return new Promise((resolve, reject) => {
		fetch(`${API_URL}${path}`, {
			method: method || 'GET',
			headers,
			body: body && JSON.stringify(body),
		})
			.then(response => {
				return response.json();
			})
			.catch(err => {
				console.log(err);
				reject(err);
			})
	});
};

export default request;
