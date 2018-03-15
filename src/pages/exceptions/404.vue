<template>
<div id="exception-404">
  <div id="wrapper">
    <!-- preloader -->
    <!-- <div id="preloader" style="display: none;">
      <div id="spinner">
        <div class="preloader-dot-loading">
          <div class="cssload-loading"><i></i><i></i><i></i><i></i></div>
        </div>
      </div>
      <div id="disable-preloader" class="btn btn-default btn-sm">Disable Preloader</div>
    </div> -->

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
                  <h2 class="mt-0">Oops! Page Not Found</h2>
                  <p>The page you were looking for could not be found.</p>
                  <router-link class="btn btn-border btn-gray btn-transparent btn-circled smooth-scroll-to-target" to="/">Return Home</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- end main-content -->

    <!-- Footer -->
    <!-- <footer id="footer" class="footer bg-black-333 text-center pt-20 pb-20">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <p class="mb-0">Copyright ©2017 FundAndImpact. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer> -->
    <!-- <a class="scrollToTop" href="#"><i class="fa fa-angle-up"></i></a> -->
  </div>
</div>
</template>
<script>
export default {
  name: "exception-404",
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">
</style>
