// this function takes a host url and path to the image storage and returns the img source path
export default function imageFactory(host, path){
	return function(image) {
		return host+path+image
	}
}
