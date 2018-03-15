<template>
  <div id="tips" class="">
    <div class="">
      <div class="col-md-12">
        <div class="call-to-action pt-40 pb-40 mb-20 border-1px bg-lighter">
          <div class="row">
            <div class="col-xs-12 col-sm-8 col-md-8">
              <div class="icon-box icon-rounded-bordered left media mb-0 ml-60 ml-sm-0"> <a class="media-left pull-left flip" href="#"> <i class="fa fa-lightbulb-o text-theme-colored border-1px-theme-colored p-20" aria-hidden="true"></i></a>
                <div class="media-body">
                  <h3 class="media-heading heading" v-lang.fundraising_tips_and_ideas>Fundraising Tips & Ideas</h3>
                  <p v-lang.learn_tips_call_msg>Learn how to run a successful fundraiser from our campaign experts.</p>
                </div>
              </div>
            </div>
            <div class="col-sm-4 col-md-4 text-center">
              <router-link to="/ideas" class="btn btn-dark btn-theme-colored btn-flat btn-xl mt-20" v-lang.learn_more>Learn More</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tips",
  data: function data() {
    return {

    }
  },
  mounted(){
    $(window).scrollTop(0);
  }
}
</script>
<style lang="css">
#tips .btn{
  font-weight: 600;
}
</style>
