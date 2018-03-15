import Vue from 'vue'
import App from './App.vue'
import Router from './routes.js'
import Translate from './packages/translation/translate.js'
import VueResource from 'vue-resource'
// import VueSocketio from 'vue-socket.io';
import Auth from './packages/auth/Auth.js'
import SocialSharing from 'vue-social-sharing'
import VueCarousel from 'vue-carousel'
import Cropper from 'cropperjs'
import VuePaginate from 'vue-paginate'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate'
import french from 'vee-validate/dist/locale/fr';
import _connection from './packages/config/backendConnection.js'
import AppConfig from './packages/config/App.js'
import moment from 'moment'
import 'moment/locale/fr'  // without this line it didn't work

Vue.use(VueResource)
// Vue.use(VueSocketio, 'http://localhost:8421')
Vue.use(Auth)
Vue.use(AppConfig)
Vue.use(VeeValidate)
Vue.use(SocialSharing)
Vue.use(VueCarousel)
Vue.use(VuePaginate)
Vue.use(_connection)

Vue.http.options.root = Vue._connection.domain
Vue.http.headers.common['Authorization'] = 'Bearer ' + Vue.oauth.getToken()
Vue.http.headers.common['Accept'] = 'application/json'

//set locales
moment.locale(localStorage.getItem('vue-lang'))
Validator.localize('fr', {
  messages: french.messages,
  attributes: {
    name: 'Le Nom'
  }
});
Validator.localize(localStorage.getItem('vue-lang'))

Vue.http.interceptors.push((request, next) => {
  next(response => {
    if (response.status === 401) {
      console.log('Need to login again')
      if (response.body.messsage == "Unauthenticated.") {
        next({
          path: '/logout'
        })

      }
    }else if (response.status === 404) {
      if (response.body.action == 'logout') {
        Vue.oauth.destroyToken()
        next({
          path: '/login'
        })
      }
    }
  })
})

Router.beforeEach(
  (to, from, next) => {
      // alert('beforeEach')
    document.title = to.meta.title
    var $preloader = $('#preloader');
    // $preloader.delay(200).fadeOut('slow');
    $preloader.fadeIn('fast');

    if (to.matched.some(record => record.meta.forVisitors)) {
      if (Vue.oauth.isAuthenticated()) {
        next({
          path: '/fundraiser'
        })
      } else next()
    } else if (to.matched.some(record => record.meta.forAuth) || to.matched.some(record => record.meta.forDashboard)) {
      if (!Vue.oauth.isAuthenticated()) {
          next({
            path: '/login'
          })
      } else next()
    } else if (to.matched.some(record => record.meta.logout)) {
      if (Vue.oauth.isAuthenticated()) {
        Vue.oauth.destroyToken()
        window.location = '/'
      } else next()
    } else next()

    if (to.matched.some(record => record.meta.inRaiser)) {
      if (localStorage.getItem('fundraiserStarted') == 1) {
        var step = parseInt(localStorage.getItem('fundraiserStep'))
        switch (step) {
          case 1:
            next({
              path: '/fundraiser/media'
            })
            break;
          case 2:
            next({
              path: '/fundraiser/story'
            })
            break;
          case 3:
            next({
              path: '/fundraiser/created'
            })
            break;
          case 4:
            next({
              path: '/fundraiser/share'
            })
            break;
          case 5:
            next({
              path: '/fundraiser/link'
            })
            break;
          default: next()

        }

      } else next()
    }
  }
)

Router.afterEach((to, from) => {
  // alert('afterEach')
})

Vue.component('input-counter', {
  props: {
    limit: {
      type: Number,
      required: false,
      default: 160
    },
    input: {
      type: String,
      required: true
    }
  },
  template: '<p v-bind:class="limiterClass"><strong><small>{{ inputLength }} / {{ limit }}</small></strong></p>',
  computed: {
    inputLength: function() {
      return this.input.length;
    },
    limiterClass: function() {
      if (this.input.length >= this.limit) {
        return 'text-danger';
      }
      if (this.input.length > 110) {
        return 'text-success';
      }
      if (this.input.length > 80) {
        return 'text-info';
      }
      if (this.input.length > 50) {
        return 'text-muted';
      }
      return 'text-danger';
    }
  }
})

Vue.filter('timeago', function(value) {
  var dateFormat = "YYYY-M-D H:m:s";
    return moment.utc(value).local().fromNow();
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: Router
})
