// usage: <input-counter v-bind:input.sync="some_input_model" v-bind:limit="160"></input-counter>
export default function(Vue) {
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
  });
}
