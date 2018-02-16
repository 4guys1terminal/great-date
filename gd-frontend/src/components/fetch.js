module.exports = {
    fetchTags(host) {
        return fetch(`${host}/tags`).then((res) => {
            return res.json()
        })
    },

    fetchActivities(host) {
        return fetch(`${host}/activities`).then((res) => {
            console.log(res);
            return res.json()
        })
    }
}
