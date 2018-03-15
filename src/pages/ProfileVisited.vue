<template>
<div id="profile-visited">
  <div class=" container">
    <div v-if="true" class="large-centered">
      <div class="card hovercard">
        <div class="card-background">
          <img class="card-bkimg" alt="" :src="(user.media && user.media[0] && user.media[0].url != '/src/assets/images/img-default.jpg') ? user.media[0].url : '/src/assets/images/wallpapers/orange.jpeg'">
        </div>
        <div class="useravatar">
          <img v-if="user.media && user.media[0] && user.media[0].url"alt="" :src="user.media[0].url">
          <span v-if="user.subnames && user.media && user.media[0] && !user.media[0].url" class="no-img">
            {{user.subnames[0].substr(0,1)}} {{user.subnames[1].substr(0,1)}}
          </span>
        </div>
        <div class="card-info">
          <span class="card-title">{{user.name}}</span>
        </div>
      </div>
      <div class="btn-pref btn-group btn-group-justified btn-group-lg" role="group" aria-label="...">
        <div class="btn-group" role="group">
          <button type="button" id="about" class="btn btn-primary" href="#tab1" data-toggle="tab"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>
              <div class="hidden-xs">About {{user.name}}</div>
          </button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" id="activities" class="btn btn-default" href="#tab2" data-toggle="tab"><span class="fa fa-newspaper-o" aria-hidden="true"></span>
              <div class="hidden-xs">{{user.name}}'s Campaigns</div>
          </button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" id="favorites" class="btn btn-default" href="#tab3" data-toggle="tab"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
              <div class="hidden-xs">Favorite Campaigns</div>
          </button>
        </div>
      </div>

      <div class="well">
        <div class="tab-content">
          <div class="tab-pane fade in active" id="tab1">
            <div class="white-box-large-only container">
              <div class="one arw mt-30">
                {{user.name}}'s story
              </div>
              <div v-if="user.story" class="large-centered">
                <div class="" v-html="user.story">

                </div>

              </div>
              <div v-else class="alert alert-info">
                {{user.name}} has not yet added his/her story.
              </div>
            </div>
          </div>
          <div class="tab-pane fade in " id="tab2">
            <div v-for="campaign in user.campaigns" :key="campaign.id" class="upcoming-events box-hover-effect effect1 media maxwidth400 bg-light mb-20">
              <div class="row equal-height">
                <div class="col-sm-4 pr-0 pr-sm-15">
                  <div class="thumb p-15">
                    <!-- <img class="img-fullwidth" :src="campaign.media.url" alt="..."> -->
                    <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'image' " class="photoframe"><img alt="" :src="campaign.media[0].url"></div>
                    <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'youtube' " class="fluid-video-wrapper">
                      <iframe width="100%" height="200px" :src="campaign.media[0].url" frameborder="0" allowfullscreen></iframe>
                    </div>
                  </div>
                </div>
                <div class="col-sm-4 border-right pl-0 pl-sm-15">
                  <div class="event-details p-15 mt-20">
                    <h4 class="media-heading text-uppercase font-weight-500 font-15 text-theme-colored">{{campaign.title}}</h4>
                    <p>{{campaign.intro}}</p>
                    <a href="javascript:void(0)" class="text-info">Details <i class="fa fa-angle-double-right"></i></a>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="event-count causes p-15 mt-15">
                    <div class="progress-item mt-20 mb-40">
                      <div class="progress mb-30">
                        <div class="progress-bar" :data-percent="campaign.percent"></div>
                      </div>
                    </div>
                    <ul class="list-inline clearfix">
                      <li class="pull-left pr-0">Raised: ${{campaign.raised}}</li>
                      <li class="text-theme-colored pull-right pr-0">Goal: ${{campaign.goal}}</li>
                    </ul>
                    <div class="mt-10">
                      <ul class="list-inline mt-15">
                        <li class="pr-0" v-if="campaign.donations"><i class="fa fa-heart-o text-theme-colored"></i> {{campaign.donations.length}} Donors</li>
                        <li><router-link :to="campaign.link" class="text-white btn btn-info ml-50"><i class="fa fa-eye"></i> View</router-link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section v-if="!user.campaigns || (user.campaigns && user.campaigns.length == 0)">
              <div class="white-box-large-only container">
                <h1 class="text-center">No Campaign</h1>
                <div class="row col-sm-6 large-centered">
                  <div class="no-help">
                    <div class="row">
                      <div class="fs-25 text-center mb-20 column small-12 large-10 large-centered">{{user.name}} doesn't have any campaign yet.</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="tab-pane fade in container" id="tab3">
            <div class="row">
                <div class="col-sm-12 col-md-11">
                  <div v-for="campaign in user.favourites" :key="campaign.id" class="upcoming-events box-hover-effect effect1 media maxwidth400 bg-light mb-20">
                    <div class="row equal-height">
                      <div class="col-sm-4 pr-0 pr-sm-15">
                        <div class="thumb p-15">
                          <!-- <img class="img-fullwidth" :src="campaign.media.url" alt="..."> -->
                          <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'image' " class="photoframe"><img alt="" :src="campaign.media[0].url"></div>
                          <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'youtube' " class="fluid-video-wrapper">
                            <iframe width="100%" height="200px" :src="campaign.media[0].url" frameborder="0" allowfullscreen></iframe>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 border-right pl-0 pl-sm-15">
                        <div class="event-details p-15 mt-20">
                          <h4 class="media-heading text-uppercase font-weight-500 font-15 text-theme-colored">{{campaign.title}}</h4>
                          <p>{{campaign.intro}}</p>
                          <a href="javascript:void(0)" class="text-info">Details <i class="fa fa-angle-double-right"></i></a>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="event-count causes p-15 mt-15">
                          <div class="progress-item mt-20 mb-40">
                            <div class="progress mb-30">
                              <div class="progress-bar" :data-percent="campaign.percent"></div>
                            </div>
                          </div>
                          <ul class="list-inline clearfix">
                            <li class="pull-left pr-0">Raised: ${{campaign.raised}}</li>
                            <li class="text-theme-colored pull-right pr-0">Goal: ${{campaign.goal}}</li>
                          </ul>
                          <div class="mt-10">
                            <ul class="list-inline mt-15">
                              <li class="pr-0" v-if="campaign.donations"><i class="fa fa-heart-o text-theme-colored"></i> {{campaign.donations.length}} Donors</li>
                              <li><router-link :to="campaign.link" class="text-white btn btn-info ml-50"><i class="fa fa-eye"></i> View</router-link></li>
                            </ul>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <section v-if="!user.favourites || (user.favourites && user.favourites.length == 0)">
                    <div class="white-box-large-only container">
                      <h1 class="text-center">No Campaign</h1>
                      <div class="row col-sm-6 large-centered">
                        <div class="no-help">
                          <div class="row">
                            <div class="fs-25 text-center mb-20 column small-12 large-10 large-centered">{{user.name}} doesn't have any campaign yet.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning mt-40">
      No user was found with this user name.
    </div>
  </div>
</div>

</div>
</template>
<script>
export default {
  name: "profile-visited",
  props: [],
  components: {

  },
  data: function data() {
    return {
      user: null
    }
  },
  methods: {

  },
  beforeCreate(){
    this.$http.get('api/profile/'+this.$route.params.id)
              .then(response => {
                this.user = response.body

                for (var c in this.user.campaigns) {
                  //get the sum of all donations
                  var raised = 0
                  for (var i in this.user.campaigns[c].donations) {
                    raised += parseInt(this.user.campaigns[c].donations[i].amount)
                  }
                  this.user.campaigns[c].raised = raised

                  //calculate the percentage raised
                  var percent = (parseInt(this.user.campaigns[c].raised) / parseInt(this.user.campaigns[c].goal)) * 100;
                  if (percent > 100) {
                    percent = 100;
                  }
                  this.user.campaigns[c].percent = Math.round(percent * 100) / 100;

                }

                for (var f in this.user.favourites) {
                  //get the sum of all donations
                  var raised = 0
                  for (var j in this.user.favourites[f].donations) {
                    raised += parseInt(this.user.favourites[f].donations[j].amount)
                  }
                  this.user.favourites[f].raised = raised

                  //calculate the percentage raised
                  var percent = (parseInt(this.user.favourites[f].raised) / parseInt(this.user.favourites[f].goal)) * 100;
                  if (percent > 100) {
                    percent = 100;
                  }
                  this.user.favourites[f].percent = Math.round(percent * 100) / 100;

                }
                // console.log(response)
              })
  },
  watch: {
    user: function (val) {
      $(".btn-pref .btn").click(function() {
        // alert('yes')
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        // $(".tab").addClass("active"); // instead of this do the below
        $(this).removeClass("btn-default").addClass("btn-primary");
      });
    }
  },
  updated: function mounted() {
    //do something after mounting vue instance
      $(".btn-pref .btn").click(function() {
        // alert('yes')
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        // $(".tab").addClass("active"); // instead of this do the below
        $(this).removeClass("btn-default").addClass("btn-primary");
      });

  }
}
</script>
<style lang="css">
/* USER profile-visited PAGE */
 #profile-visited .card {
    margin-top: 20px;
    padding: 30px;
    background-color: rgba(214, 224, 226, 0.2);
    -webkit-border-top-left-radius:5px;
    -moz-border-top-left-radius:5px;
    border-top-left-radius:5px;
    -webkit-border-top-right-radius:5px;
    -moz-border-top-right-radius:5px;
    border-top-right-radius:5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 0px;
}
#profile-visited .well {
   -webkit-border-top-left-radius:0px;
   -moz-border-top-left-radius:0px;
   border-top-left-radius:0px;
   -webkit-border-top-right-radius:0px;
   -moz-border-top-right-radius:0px;
   border-top-right-radius:0px;
}
#profile-visited .card.hovercard {
    position: relative;
    padding-top: 0;
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    background-color: rgba(255, 255, 255, 1);
}
#profile-visited .card.hovercard .card-background {
    height: 130px;
}
#profile-visited .card-background img{
    -webkit-filter: blur(25px);
    -moz-filter: blur(25px);
    -o-filter: blur(25px);
    -ms-filter: blur(25px);
    filter: blur(25px);
    margin-left: -100px;
    margin-top: -200px;
    min-width: 130%;
}
#profile-visited .card.hovercard .useravatar {
    position: absolute;
    top: 35px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    right: 0;
    width: 130px;
    height: 130px;
    max-width: 130px;
    max-height: 130px;
    /*overflow: hidden;*/
}
#profile-visited .card.hovercard .useravatar img, #profile-visited .card.hovercard .useravatar span.no-img{
    width: 100%;
    height: 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 5px solid rgba(255, 255, 255, 0.5);
    /*position: relative;*/
}
#profile-visited .card.hovercard .useravatar img{
  /*margin-top: -45px;*/
}
#profile-visited .card.hovercard .useravatar span.no-img{
    padding: 45px;
    font-size: 25px;
    font-weight: 600;
    position: relative;
    top: 45px;
}
#profile-visited .card.hovercard .useravatar .overlay{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  font-size: 25px;
  font-weight: 600;
  width: 100%;
  height: 100%;
  padding: 48px;
  background: rgba(225,175,0,.5);
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  color: white;
  display: none;
}
#profile-visited .card.hovercard .card-info {
    position: absolute;
    bottom: 14px;
    left: 0;
    right: 0;
}
#profile-visited .card.hovercard .card-info .card-title {
    padding:0 5px;
    font-size: 20px;
    line-height: 1;
    color: #262626;
    background-color: rgba(255, 255, 255, 0.1);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}
#profile-visited .card.hovercard .card-info {
    overflow: hidden;
    font-size: 12px;
    line-height: 20px;
    color: #737373;
    text-overflow: ellipsis;
}
#profile-visited .card.hovercard .bottom {
    padding: 0 20px;
    margin-bottom: 17px;
}
#profile-visited .btn-pref .btn {
    -webkit-border-radius:0 !important;
}
#profile-visited .btn-primary{
  background: rgb(255, 175, 0);
  border-color: rgb(255, 175, 0);
}
#profile-visited .bg-light {
  background-color: #fff !important;
}
#profile-visited .activities {
    max-height: 1208px;
    position: relative;
    padding-bottom: 50px;
}
#profile-visited .decor-default {
    background-color: #ffffff !important;
}
#profile-visited div[class*='col-'] > .col-inside-lg {
    padding: 20px;
}

#profile-visited .activities .unit {
    /*min-height: 80px;*/
    position: relative;
    overflow: hidden;
}

#profile-visited .activities .unit .field {
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
}

#profile-visited .activities .unit .field a {
    font-weight: bold;
    color: #333333;
}

#profile-visited .activities .unit .field.btn-group-xs {
    padding: 20px 0 0;
}
#profile-visited .activities .unit .field {
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
}
#profile-visited .f-l {
    float: left;
}
#profile-visited .cd-timeline-block img{
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  top: 0;
  vertical-align: center;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  margin: 0px;
}
#profile-visited .cd-timeline-block{
  padding: 0px;
  position: relative;
}
</style>
