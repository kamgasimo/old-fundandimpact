export default function (Vue) {
	Vue.app = {
		url: 'http://fundandimpact.com',
		gup( name, url ) {
		    if (!url) url = location.href;
		    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		    var regexS = "[\\?&]"+name+"=([^&#]*)";
		    var regex = new RegExp( regexS );
		    var results = regex.exec( url );
		    return results == null ? null : results[1];
		},
	}

	Object.defineProperties(Vue.prototype, {
		$app: {
			get: () => {
				return Vue.app
			}
		}
	})
}
