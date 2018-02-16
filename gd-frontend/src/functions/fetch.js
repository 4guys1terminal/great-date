const DEFAULT_HOST = "http://localhost:3000"

export default function(host) {
    return {
        fetchTags: function() {
            return fetch(`${host}/tags`)
            .then(res => res.json)
        },

        fetchActivities: function() {
            return fetch(`${host}/activities`)
            .then(res => res.json())
        },

        fetchActivity: function(id) {
            return fetch(`${host}/activities/${id}`)
            .then(res => res.json())
        },
    }
}
