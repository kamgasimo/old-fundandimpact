export default function (Vue) {
	let authUser = {}

	Vue.oauth = {

		// set token
		setToken (token, expiration) {
			localStorage.setItem('token', token)
			localStorage.setItem('expiration', expiration)
		},

		// get token
		getToken () {
			var token = localStorage.getItem('token')
			var expiration = localStorage.getItem('expiration')

			if (! token)
				return null

			// if (Date.now() > parseInt(expiration)) {
			// 	this.destroyToken()
			// 	return null
			// } else
				return token
		},

		// destroy token
		destroyToken () {
			localStorage.removeItem('token')
			localStorage.removeItem('expiration')
		},

		//isAuthenticated
		isAuthenticated () {
			if (this.getToken())
				return true
			else
				return false
		},

		/**
     * setAuthUser
     *   set auth user info
     * @return void
     */
     setAuthUser(data) {
       authUser = data
     },

    /**
     * getAuthUser
     *   get auth user info
     * @return Object
     */
     getAuthUser() {
       return authUser
     },
	}

	Object.defineProperties(Vue.prototype, {
		$oauth: {
			get: () => {
				return Vue.oauth
			}
		}
	})
}
