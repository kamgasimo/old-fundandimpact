export default function (Vue) {
	Vue._connection = {
			client_id: 2,
    	client_secret: '2QWIERUhYQuyaePgPAxFbqQ0DHf5ngrDgpMxVHrb',
    	domain: 'https://backend-fundandimpact.com',
			testDomain: 'https://18821235.ngrok.io'
	}

	Object.defineProperties(Vue.prototype, {
		$_connection: {
			get: () => {
				return Vue._connection
			}
		}
	})
}
