<template>
<div id="exception-campaigns-404">
  <div id="wrapper">
    <!-- start main-content -->
    <div class="main-content">
      <!-- Section: home -->
      <section id="home" class="fullscreen bg-lightest" style="height: 500px;">
        <div class="display-table text-center">
          <div class="display-table-cell">
            <div class="container pt-0 pb-0">
              <div class="row">
                <div class="col-md-8 col-md-offset-2">
                  <h1 class="font-150 text-theme-colored mt-0 mb-0"><i class="fa fa-map-signs text-gray-silver"></i>404!</h1>
                  <h2 class="mt-0">Oops! Campaign Not Found</h2>
                  <p>The Campaign you were looking for could not be found.</p>
                  <router-link class="btn btn-border btn-gray btn-transparent btn-circled smooth-scroll-to-target" to="/">Return Home</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  </div>
</div>
</template>
<script>
export default {
  name: "exception-campaigns-404",
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">
</style>
