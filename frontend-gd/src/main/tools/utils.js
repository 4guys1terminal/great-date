// NOTE: this file is for common util functions

// old imgSrc.js
const imageFactory = (host, path) => {
	return function(image) {
		return host+path+image;
	};
}

export {
	imageFactory
};
