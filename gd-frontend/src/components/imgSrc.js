function imageHost(host, path){
    return function(image) {
        return host+path+image
    }
}

exports.imgSrc = imageHost(host,path);
