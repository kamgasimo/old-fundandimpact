<template>
<div id="phone-field">
  {{mask}}
  <masked-input v-model="user.phone" mask="\+\1 (111) 111-1111" placeholder="Phone number" type="tel" />
</div>
</template>
<script>
import MaskedInput from 'vue-masked-input'
export default {
  name: "phone-field",
  components: {
    MaskedInput
  },
  data: function data () {
    return {
      user: {
        phone: '',
        country: ''
      },
      resource: [],
      mask: ''
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var result  = window.PHONEMASK.filter(function(o){return o.b == value;} );
  }
}
</script>
<style lang="css">
</style>
