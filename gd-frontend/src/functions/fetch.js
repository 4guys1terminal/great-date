var host
 if(process.env.NODE_ENV === 'production'){ host = "/" } else { host = "http://localhost:3000/" }

export default function(host) {
    return {
        fetchTags: function() {
            return fetch(`${host}api/tags`)
            .then(res => res.json)
        },

        fetchActivities: function() {
            return fetch(`${host}api/activities`)
            .then(res => res.json())
        },

        fetchActivity: function(id) {
            return fetch(`${host}api/activities/${id}`)
            .then(res => res.json())
        },
    }
}
