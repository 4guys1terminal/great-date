const API = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000'

const fetches = {
  fetchTags() {
      return fetch(`${API}/api/tags`)
      .then(res => res.json())
      .catch(e => {
        console.log('fetchTags catch:', e)

        return e
      })
  },

  fetchAllActivities() {
      return fetch(`${API}/api/activities`)
      .then(res => res.json())
      .catch(e => {
        console.log('fetchActivities catch:', e)

        return e
      })
  },

  fetchApprovedActivities() {
      return fetch(`${API}/api/approvedActivities`)
      .then(res => res.json())
      .catch(e => {
        console.log('fetchApprovedActivities catch:', e)

        return e
      })
  },

  fetchActivity(id) {
      return fetch(`${API}/api/activities/${id}`)
      .then(res => res.json())
      .catch(e => {
        console.log('fetchActivity catch:', e)

        return e
      })
  }
}

export default fetches
