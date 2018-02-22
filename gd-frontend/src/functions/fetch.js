const host = process.env.NODE_ENV === 'production' ? '/' : '/'

export default function() {
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
