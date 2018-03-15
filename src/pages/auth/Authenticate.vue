<template>
  <div id="authenticate">

  </div>
</template>
<script>
export default {
  name: "authenticate",
  data: function data() {
    return {

    }
  },
  beforeCreate(){
    //do something before creating vue instance

    // console.log(this.$route.query);
    if (!this.$oauth.isAuthenticated()) {
      var token = this.$route.query.token
      var expiration = this.$route.query.expiry
      this.$oauth.setToken(token, expiration);
    }

    localStorage.setItem('alert', 'email-verified')
    window.location = '/fundraiser'

  }
}
</script>
<style lang="css">
</style>
