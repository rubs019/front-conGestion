import { Token } from "./storage"

export const TimeOffAPI = {
	data: function() {
		return {
			API_URL: "http://localhost:5000/api",
			TOKEN: null,
			options: {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	},
	methods: {
		auth: async function (data = {}) {
			const endpoint = 'users/login'
			this.options.body = JSON.stringify(this.authDTO(data))
			return await fetch(`${this.API_URL}/${endpoint}`, this.options)
		},
		getEvents: async function(userId) {
			if (!userId) return Promise.reject('No userId provided')
			if (!Token.value) return Promise.reject('No token has been set')

			const endpoint = 'timeoff/events/' + userId
			this.options.method = 'GET'
			this.options.headers =  {
				...this.options.headers,
				'Authorization': `Bearer ${Token.value}`
			}

			return await fetch(`${this.API_URL}/${endpoint}`, this.options)
		},
		getCurrentBalance: async function(userId) {
			const endpoint = 'timeoff/current-balance/' + userId
			if (!Token.value) return Promise.reject('No token has been set')
			this.options.method = 'GET'
			this.options.headers =  {
				...this.options.headers,
				'Authorization': `Bearer ${Token.value}`
			}

			return await fetch(`${this.API_URL}/${endpoint}`, this.options)
		},
		setToken: function(token) {
			Token.setToken(token)
			console.log('A new token has been set : ', Token)
		},
		authDTO(credential) {
			return {
				UserName: credential.name,
				Password: credential.password
			}
		}
	}
}
