import request from '../tools/request';

class TagController {
	static fetchTags() {
		return request(`/api/tags`)
			.catch(err => {
				throw new Error(err);
			})
	}
}

export default TagController;
