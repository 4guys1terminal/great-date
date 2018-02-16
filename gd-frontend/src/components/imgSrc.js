export default function imageFactory(host, path){
    return function(image) {
        return host+path+image
    }
}
