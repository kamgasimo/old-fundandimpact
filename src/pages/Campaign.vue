<template>
<div id="campaign">
  <!-- Start main-content -->
  <div class="main-content">

    <!-- Section: Blog -->
    <section>
      <div class="container mt-10 mb-30 pt-30 pb-30">
        <div class="row">
          <div class="col-md-7 bg-white p-0">
            <div class="blog-posts single-post">
              <article class="post clearfix mb-0">
                <div class="entry-header">
                  <div class="post-thumb thumb">
                    <!-- <img src="/src/assets/images/photos/single-img.jpg" alt="" class="img-responsive img-fullwidth"> -->
                    <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'image' " class="photoframe"><img alt="" :src="campaign.media[0].url"></div>
                    <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'youtube' " class="fluid-video-wrapper">
                      <iframe width="100%" height="360px" :src="campaign.media[0].url" frameborder="0" allowfullscreen></iframe>
                    </div>
                   </div>
                  <div class="entry-meta meta-absolute text-center pl-15 pr-15">
                    <div class="display-table">
                      <div class="display-table-cell">
                        <ul>
                          <li v-if="campaign.likes"><a @click="likeCampaign()" class="text-white" href="javascript:"><i class="text-white fa fa-thumbs-o-up"></i> {{campaign.likes.length}} <br> <span v-lang.likes>Likes</span></a></li>
                          <li v-if="campaign.comments" class="mt-20"><a class="text-white" href="#comment-box"><i class="text-white fa fa-comments-o"></i> {{campaign.comments.length}} <br> <span v-lang.comments>comments</span></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="entry-title p-15 pt-0 pb-0">
                  <h3><a href="#">{{campaign.title}}</a></h3>
                </div>
                <div class="entry-content mt-10 p-15">
                  <div v-if="$route.query.view != 'updates'" v-html="campaign.story">

                  </div>
                  <div  v-if="$route.query.view == 'updates'" class="">
                    <ul id="myTab" class="nav nav-tabs boot-tabs">
                      <li v-for="(update, index) in campaign.updates" :key="update.id" v-if="index < 3" :class="(index == 0) ? 'active' : ''"><a :href="'#update'+index" data-toggle="tab"><span v-lang.update>Update</span> {{(campaign.updates.length - index)}}</a></li>
                      <li v-if="campaign.updates && campaign.updates.length > 3" class="dropdown"> <a href="#" id="myTabDrop2" class="dropdown-toggle" data-toggle="dropdown"><span v-lang.more>More</span> <b class="caret"></b></a>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop2">
                          <li v-for="(update3, index) in campaign.updates" :key="update3.id" v-if="index >= 3"><a :href="'#dropdown'+index" tabindex="-1" data-toggle="tab">{{'Update '+ (campaign.updates.length - index)}}</a></li>
                        </ul>
                      </li>
                    </ul>
                    <div id="myTabContent" class="tab-content">
                      <div v-for="(update2, index) in campaign.updates" :key="update2.id"  v-if="index < 3" :class="(index == 0) ? 'tab-pane fade in active' : 'tab-pane fade'" :id="'update'+index">
                        <h3>{{update2.title}}</h3>
                        <p v-html="update2.update"></p>
                      </div>

                      <div v-for="(update4, index) in campaign.updates" :key="update4.id"  v-if="campaign.updates && campaign.updates.length > 3 && index >= 3" class="tab-pane fade" :id="'dropdown'+index">
                        <h3>{{update4.title}}</h3>
                        <p v-html="update4.update"></p>
                      </div>
                    </div>

                  </div>
                  <div class="mt-50 mb-0">
                    <h5 class="pull-left mt-10 mr-20 text-theme-colored"><span v-lang.share>Share</span>:</h5>
                    <ul class="styled-icons icon-circled m-0">
                      <share-on-social :url="$app.url+campaign.link"></share-on-social>
                    </ul>
                  </div>
                </div>
              </article>
              <div class="show-for-large mt-30 p-30 pt-0 pb-0">
                <!-- COMMENTS -->
                <div class="dropdown-container">
                  <h5 class="widget-title line-bottom" v-lang.recent_updates>Recent Updates</h5>
                </div>
                <!--/.dropdown-container-->
                <div class="row column  mt-20 mb-20">
                  <div class="mr mb10 ml">
                    <div v-if="campaign.updates && campaign.updates.length < 1"class="alert alert-info">
                      <span v-lang.no_update_have_been_posted_for_this_campaign_yet>No update have been posted for this Campaign yet</span>!
                    </div>
                    <router-link v-if="$route.query.view != 'updates' && campaign.updates && campaign.updates.length > 0" to="?view=updates" class="button secondary expanded text-theme-colored" v-lang.view_recent_updates>
                      View Recent Updates.
                    </router-link>
                    <router-link v-if="$route.query.view == 'updates'" :to="campaign.link" class="button secondary expanded text-theme-colored" v-lang.view_story>
                      View Story
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="" v-if="campaign.enable_comment == '1'">
                <div class="show-for-large js-comments-column-contain mt-30 p-30 pt-0 pb-0">
                  <!-- COMMENTS -->
                  <div class="dropdown-container">
                    <h5 class="widget-title line-bottom" v-lang.recent_comments>Recent Comments</h5>
                  </div>
                  <!--/.dropdown-container-->
                  <div class="row column  mt-20 mb-20">
                    <div class="mr mb10 ml">
                      <a href="#comment-box" class="button secondary expanded text-theme-colored" v-lang.leave_a_comment>
                        Leave a Comment
                      </a>
                    </div>
                  </div>
                  <!--/.row-->
                  <div class="row js-comments-contain">
                    <div class="column showcontrol-comments" style="width: 100%;">
                      <div class="supporters-list">
                        <paginate
                            name="comments"
                            :list="campaign.comments"
                            :per="5"
                          >
                          <div v-for="comment in paginated('comments')" :key="comment.id" class="supporter js-comment-content">
                            <div class="avatar-contain">
                              <img class="thumbnail media-round" :src="(!comment.user) ? '/src/assets/images/img-default.jpg' : (comment.user.media) ? comment.user.media[0].url: '/src/assets/images/img-default.jpg'" alt="">
                            </div>
                            <div class="supporter-info">
                              <div class="row collapse">
                                <div class="column small-10 medium-11 text-black">
                                  <a :href="comment.website" target="_blank" class="supporter-name">
                                    {{comment.name}}
                                  </a>
                                  <div class="supporter-time">
                                    {{comment.created_at | timeago}}
                                  </div>
                                </div>
                                <div class="heart column small-2 medium-1">
                                  <a @click="likeComment(comment)" href="javascript:" class="js-heart fave-contain heart-64924704" title="Click here to like this">
                                    <div class="campaign-sp campaign-sp--heart fave-num-short">
                                      <i class="fa fa-heart"></i>
                                      <span v-if="comment.likes" class="roundedNum">{{comment.likes.length}}</span></div>
                                    </a>
                                </div>
                              </div>
                              <div class="row column">
                                <div class="truncate-text--comment js-truncate">
                                  <p class="text-color">{{comment.comment}}
                                  </p>
                                </div>
                                <a class="read-more hide" href="#" v-lang.plus_read_more>+ Read More</a>
                              </div>
                            </div>
                            <!--/.supporter-info-->
                            <hr>
                          </div>
                          </paginate>
                      </div>
                      <div class="comments-control-footer mt-30 mb-30">
                        <paginate-links for="comments" :limit="2" :show-step-links="true" :async="true" :classes="{ 'ul': 'pagination' }" class="theme-colored"></paginate-links>
                        <a class="button secondary expanded is-loading hide">
                            <i class="fa fa-circle-o-notch fa-spin"></i>
                        </a>
                        <div class="row text-center mb text-small">
                          <span v-if="$refs.paginator">
                            <span v-lang.viewing>Viewing</span> {{$refs.paginator.pageItemsCount}} <span v-lang.results>results</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="comment-box" class="comment-box p-30">
                  <div class="row">
                    <div class="col-sm-12">
                      <h5 class="widget-title line-bottom" v-lang.leave_a_comment>Leave a Comment</h5>
                      <div class="row">
                        <form role="form" id="comment-form">
                          <div v-if="!this.$oauth.isAuthenticated()" class="col-sm-6 pt-0 pb-0">
                            <div class="form-group">
                              <p :class="{ 'control': true }">
                                  <input v-model="comment.user.name" v-validate="'required'" :class="{'input form-control': true, 'is-danger': errors.has('name') }" name="name" type="text" placeholder="Enter Name">
                                  <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                              </p>
                            </div>
                            <div class="form-group">
                              <p :class="{ 'control': true }">
                                  <input v-model="comment.user.email" v-validate="'required|email'" :class="{'input form-control': true, 'is-danger': errors.has('email') }" name="email" title="Email" type="text" placeholder="Enter Email">
                                  <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                              </p>
                            </div>
                            <div class="form-group">
                              <p :class="{ 'control': true }">
                                  <input v-model="comment.user.website" v-validate="'required|url'" :class="{'input form-control': true, 'is-danger': errors.has('website') }" name="website" type="url" placeholder="Enter Website">
                                  <span v-show="errors.has('website')" class="help is-danger">{{ errors.first('website') }}</span>
                              </p>
                            </div>
                          </div>
                          <div :class="(this.$oauth.isAuthenticated()) ? 'col-sm-12' : 'col-sm-6'">
                            <div class="form-group">
                              <p :class="{ 'control': true }">
                                  <textarea v-model="comment.user.comment" v-validate="'required'" :class="{'input form-control': true, 'is-danger': errors.has('comment') }" name="comment" type="text" placeholder="Enter Message"  rows="5"></textarea>
                                  <span v-show="errors.has('comment')" class="help is-danger">{{ errors.first('comment') }}</span>
                              </p>
                              <!-- <textarea class="form-control" required name="contact_message2" placeholder="Enter Message" rows="7"></textarea> -->
                            </div>
                            <div class="form-group">
                              <button @click="submitComment()" v-if="!loading" type="button" class="btn next2 btn-flat pull-right m-0" v-lang.submit_comment>Submit Comment</button>
                              <div v-if="loading" class="loading3 show-on-load">
                                <div class="loader"></div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="alert alert-warning mt-15" v-else>
                <span v-lang.comments_disabled_by_campaign_owner>Comments Disabled by Campaign owner.</span>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-5">
            <div class="sidebar sidebar-right mt-sm-30">
              <div class="widget">
                <div class="call-to-action pb-50 border-1px bg-lighter">
                  <h2 class="goal">
                    <strong>${{campaign.raised}}</strong>
                    <small class="smaller"><span v-lang.of>of</span> ${{campaign.goal}} <span v-lang.goal>goal</span></small>
                  </h2>
                  <div class="progress-item mt-55">
                    <div class="progress mb-0">
                      <div :data-percent="campaign.percent" class="progress-bar appeared" :style="'width: '+campaign.percent+'%;'"><span class="percent">{{campaign.percent}}%</span></div>
                    </div>
                  </div>
                  <div v-if="campaign.donations" class="mt-10 campaign-status text-small">
                    <span v-lang.number_of_donations>Number of Donations</span>: <span>{{campaign.donations.length}}</span><br>
                    <span v-lang.created>Created</span>: {{campaign.created_at | timeago}}
                  </div>
                  <router-link v-if="campaign.enable_donation == '1'" :to="campaign.link+'/donate'" type="button" style="font-weight: 600; font-size: 1.375rem; padding: 1rem 0.625rem;" class=" mt-30 btn btn-primary btn-theme-colored btn-lg btn-block" v-lang.donate_now>Donate Now</router-link>

                  <div class="alert alert-warning mt-15" v-else>
                    <span v-lang.donation_disabled_by_campaign_owner>Donation Disabled by Campaign owner.</span>
                  </div>
                  <div class="row column  mt-20 mb-20">
                    <div v-if="$oauth.isAuthenticated()"class="mr mb10 ml">
                      <a v-show="!loadingFavourite && !isFavour(campaign)" @click="setFavourite(campaign)" class="button secondary expanded text-theme-colored" v-lang.add_campaign_to_favourites>
                        Add Campaign to Favourites
                      </a>
                      <a v-show="!loadingFavourite && isFavour(campaign)" @click="unsetFavourite(campaign)" class="button secondary expanded text-theme-colored" v-lang.remove_campaign_from_favourites>
                        Remove Campaign from Favourites
                      </a>
                      <div v-if="loadingFavourite" class="loading3 show-on-load">
                        <div class="loader"></div>
                      </div>
                    </div>
                  </div>
                  <div class="section-title mt-20">
                    <div class="row">
                      <div class="col-md-6 col-md-offset-3">
                        <div class="text-center">
                          <h5 class="sub-title both-side-line" v-lang.share_on_social_networks>Share on social networks</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <share-on-social :url="$app.url+campaign.link"></share-on-social>
                </div>
              </div>
              <div class="widget">
                <div class="created-date"><span v-lang.created>Created</span> {{campaign.created_at}}</div>
                <div class="dotted-line mt-5 mb-10 mr ml"></div>
                <div class="co-info ml">
                  <div class="avatar-contain">
                    <img v-if="campaign.user && campaign.user.media[0]" class="thumbnail media-round" :src="campaign.user.media[0].url" alt="">
                  </div>
                  <div v-if="campaign && campaign.user" class="co-details">
                    <a :href="'mailto:'+campaign.user.email" style="font-size: 20px;">{{campaign.user.name}} <i class="fa fa-envelope js-contact-organizer-open text-theme-colored"></i></a>
                    <div class="pills-contain">
                      <router-link :to="campaign.category.link" class="icon-link category-link-name js-category-link" >
                          <i class="fa fa-tag fa--fixed-width text-theme-colored"></i>&nbsp; <span class="text-small" style="color:#666;">{{campaign.category.label}}</span>
                      </router-link><br/>
                      <a href="#" class="icon-link location-name js-location-link">
                          <i class="fa fa-map-marker fa--fixed-width text-theme-colored"></i>&nbsp; {{campaign.user.town.name}}, {{campaign.user.state.name}}, {{campaign.user.country.name}}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="campaign.donations && campaign.donations.length > 0" class="">
                <div class="widget">
                  <h5 class="widget-title line-bottom" v-lang.top_supporters>Top Supporters</h5>
                  <div class="supporters-list" style="">
                    <div class="supporter">
                      <div class="supporter-title underline" v-lang.first_donor>First Donor</div>
                      <div class="avatar-contain">
                        <!-- <div class="avatar-no-pic media-round thumbnail">JW</div> -->
                        <img v-if="campaign.donations[campaign.donations.length - 1].user && campaign.donations[campaign.donations.length - 1].user.media[0] && !campaign.donations[campaign.donations.length - 1].hideName" class="thumbnail media-round" :src="campaign.donations[campaign.donations.length - 1].user.media[0].url" alt="">
                        <img v-else src="/src/assets/images/img-default.jpg" class="thumbnail media-round" alt="">
                      </div>
                      <div class="supporter-info" style="border-bottom: none">
                        <a :href="'mailto:'+campaign.donations[campaign.donations.length - 1].email" target="_blank" v-if="!campaign.donations[campaign.donations.length - 1].hideName" class="supporter-name text-black">{{campaign.donations[campaign.donations.length - 1].name}} </a>
                        <div class="supporter-name text-color" v-else v-lang.anonymous>Anonymous</div>
                        <div class="supporter-time text-black">
                          ${{campaign.donations[campaign.donations.length - 1].amount}} </div>
                      </div>
                    </div>
                    <!-- <div class="supporter">
                      <div class="supporter-title underline">Most Raised From Sharing</div>
                      <div class="avatar-contain"><img class="thumbnail media-round" src="https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/11693923_129294167432299_8802412497508078445_n.jpg?oh=d59c38de1bbe3fca3a77740e7f0e7e24&amp;oe=5A2FF5A7" alt=""></div>
                      <div class="supporter-info" style="border-bottom: none">
                        <div class="supporter-name text-black">Ali Banat</div>
                        <div class="supporter-time text-black">
                          $5 from sharing </div>
                      </div>
                    </div> -->
                  </div>
                </div>
                <div class="widget">
                  <h5 class="widget-title line-bottom" v-lang.recent_donations>Recent Donations</h5>
                  <div class="showcontrol-donations">
                    <div class="supporters-list well">
                      <paginate
                          name="donations"
                          :list="campaign.donations"
                          :per="5"
                        >
                        <div v-for="donation in paginated('donations')" :key="donation.id" class="supporter js-donation-content " :data-id="donation.id">
                          <div class="avatar-contain">
                            <img v-if="donation.user && donation.user.media[0] && !donation.hideName" class="thumbnail media-round" :src="donation.user.media[0].url" alt="">
                            <img v-else src="/src/assets/images/img-default.jpg" class="thumbnail media-round" alt="">
                          </div>
                          <div class="supporter-info text-black">
                            <div class="row collapse">
                              <div class="column small-10 medium-11">
                                <div class="supporter-amount">${{donation.amount}}</div>
                                <a :href="'mailto:'+donation.email" target="_blank" class="supporter-name text-color" v-if="!donation.hideName">{{donation.name}}</a>
                                <div class="supporter-name text-color" v-else v-lang.anonymous>Anonymous</div>
                                <div class="supporter-time">{{donation.created_at | timeago}}</div>
                              </div>
                              <div class=" column ">

                                <a @click="likeDonation(donation)" title="Like this Donation">
                                  <i class="fa fa-heart"></i>
                                  <span v-if="donation.likes" class="roundedNum">{{donation.likes.length}}</span>
                                </a>
                              </div>
                            </div>
                            <div class="row column">
                              <div class="truncate-text--comment js-truncate">
                                <p  class="text-color">{{donation.comment}}</p>
                              </div>
                            </div>
                            <div id="toolbar" class="row column toolbar">
                              <!-- <a href="#" class="read-more hide">
                                  <i class="fa fa-plus" aria-hidden="true"></i>More
                              </a> -->
                            </div>
                          </div>
                          <!--/.supporter-info-->
                          <hr>
                        </div>
                    </paginate>
                    </div>
                    <div class="donations-control-footer">
                      <paginate-links for="donations" :limit="2" :show-step-links="true" :async="true" :classes="{ 'ul': 'pagination' }" class="theme-colored"></paginate-links>
                      <a class="button secondary expanded is-loading hide">
                          <i class="fa fa-circle-o-notch fa-spin"></i>
                      </a>
                      <div class="row text-center mb text-small">
                        <span v-if="$refs.paginator">
                          <span v-lang.viewing>Viewing</span> {{$refs.paginator.pageItemsCount}} <span v-lang.results>results</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="link-bar">
                <span v-lang.no_donation_yet>No donation yet!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- end main-content -->
</div>
</template>
<script>
import ShareOnSocial from '../components/dynamic/ShareOnSocial.vue'
export default {
  name: "campaign",
  props: ['campaign', 'user', 'deleteCampaign', 'setFavourite', 'unsetFavourite'],
  components: {
    'share-on-social': ShareOnSocial
  },
  watch: {
    user: function (val) {
      this.comment.user.name = this.user.name
      this.comment.user.email = this.user.email
      this.comment.user.website = this.$app.url+'/profile/'+this.user.uname
    },
    campaign: function (val) {
      document.title = 'FundAndImpact - '+this.campaign.title
      $("#meta-og-title").attr('content', 'FundAndImpact - '+this.campaign.title)
      $("#meta-og-description").attr('content', this.campaign.intro)
      if (this.campaign.media[0].media_type == 'image') {
        $("#meta-og-image").attr('content', this.campaign.media[0].url)
      } else if(this.campaign.media[0].media_type == 'youtube') {
        $("#meta-og-image").attr('content', this.campaign.media[0].video_preview)
      }
      $("#meta-og-url").attr('content', this.$app.url+this.campaign.link)
      $("#meta-tw-title").attr('content', 'FundAndImpact - '+this.campaign.title)
      $("#meta-tw-description").attr('content', this.campaign.intro)
      if (this.campaign.media[0].media_type == 'image') {
        $("#meta-tw-image").attr('content', this.campaign.media[0].url)
      } else if(this.campaign.media[0].media_type == 'youtube') {
        $("#meta-tw-image").attr('content', this.campaign.media[0].video_preview)
      }
      $("#meta-tw-card").attr('content', this.campaign.title)
    }
  },
  data: function data() {
    return {
      comment: {
        user: {
          name: '',
          email: '',
          website: '',
          comment: '',
        }
      },
      paginate: ['comments', 'donations'],
      loading: false,
      loadingFavourite: false
    }
  },
  methods: {
    isFavour(campaign){
      var that = this
      if (this.user && this.user.favourites) {
        var present = this.user.favourites.filter(function (o) {
          return o.link == that.campaign.link
        });
        // alert(present)
        if (present.length > 0) {
          return true
        }else{
          return false
        }
      }

    },
    submitComment(){
      this.$validator.validateAll().then((result) => {
          if (result) {
            this.loading = true
            var data = {
              name: this.comment.user.name,
              email: this.comment.user.email,
              website: this.comment.user.website,
              comment: this.comment.user.comment,
              link_id: this.campaign.link_id,
              uname: this.$route.params.user
            }
            var that = this
            if (this.$oauth.isAuthenticated()) {
              this.$http.post('api/comment/create/auth', data)
                        .then(response => {
                          swal({
                              title: "Comment Posted!",
                              text: 'You have successfully posted your comment',
                              type: "success",
                              showCancelButton: false,
                              confirmButtonText: "ok",
                              closeOnConfirm: true,
                            },
                            function(isConfirm) {
                              if (isConfirm) {
                                that.loading = false
                                that.comment.user.comment = '...'
                                that.campaign.comments.push(response.body.data)
                              }
                            });
                        })
                        .catch(e => {
                          this.loading = false
                          swal("Comment Failed!", "Please refresh the page and try again.", "error")
                        })
            }else{
              this.$http.post('api/comment/create', data)
                        .then(response => {
                          swal({
                              title: "Comment Posted!",
                              text: 'You have successfully posted your comment',
                              type: "success",
                              showCancelButton: false,
                              confirmButtonText: "ok",
                              closeOnConfirm: true,
                            },
                            function(isConfirm) {
                              if (isConfirm) {
                                that.loading = false
                                that.comment.user.comment = '...'
                                that.campaign.comments.push(response.body.data)
                              }
                            });
                        })
                        .catch(e => {
                          this.loading = false
                          swal("Comment Failed!", "Please refresh the page and try again.", "error")
                        })
            }
          }

      })
    },
    likeCampaign(){
      var that = this
      var liker  = this.campaign.likes.filter(function(o){
        return o.user_id == that.user.id;
      });
      if (liker.length > 0) {
        swal("Like Failed!", "You can't like this twice", "error")
        return
      }
      var data = {
        link_id: this.campaign.link_id,
        uname: this.$route.params.user
      }
      if (this.$oauth.isAuthenticated()) {
        this.$http.post('api/campaign/like', data)
                  .then(response => {
                    swal({
                        title: "Campaign Liked!",
                        text: 'You have liked this Campaign',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "ok",
                        closeOnConfirm: true,
                      },
                      function(isConfirm) {
                        if (isConfirm) {
                          that.campaign.likes.push(response.body.data)
                        }
                      });
                  })
                  .catch(e => {
                    swal("Like Failed!", "Please refresh the page and try again.", "error")
                  })
      }else{
        swal({
            title: "Not Login!",
            text: 'Please login to like this Campaign',
            type: "error",
            showCancelButton: true,
            confirmButtonText: "Login",
            closeOnConfirm: false,
          },
          function(isConfirm) {
            if (isConfirm) {
              that.$router.push('/login')
            }
          });
      }
    },
    likeComment(comment){
      var that = this
      var index = that.campaign.comments.indexOf(comment)
      var liker  = this.campaign.comments[index].likes.filter(function(o){
        return o.user_id == that.user.id;
      });
      if (liker.length > 0) {
        swal("Like Failed!", "You can't like this twice", "error")
        return
      }
      var data = {
        link_id: this.campaign.link_id,
        uname: this.$route.params.user,
        comment_id: comment.id
      }
      if (this.$oauth.isAuthenticated()) {
        this.$http.post('api/campaign/comment/like', data)
                  .then(response => {
                    swal({
                        title: "Comment Liked!",
                        text: 'You have liked this Comment',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "ok",
                        closeOnConfirm: true,
                      },
                      function(isConfirm) {
                        if (isConfirm) {
                          that.campaign.comments[index].likes.push(response.body.data)
                        }
                      });
                  })
                  .catch(e => {
                    swal("Like Failed!", "Please refresh the page and try again.", "error")
                  })
      }else{
        swal({
            title: "Not Login!",
            text: 'Please login to like this Comment',
            type: "error",
            showCancelButton: true,
            confirmButtonText: "Login",
            closeOnConfirm: false,
          },
          function(isConfirm) {
            if (isConfirm) {
              that.$router.push('/login')
            }
          });
      }
    },
    likeDonation(donation){
      var that = this
      var index = that.campaign.donations.indexOf(donation)
      var liker  = this.campaign.donations[index].likes.filter(function(o){
        return o.user_id == that.user.id;
      });
      if (liker.length > 0) {
        swal("Like Failed!", "You can't like this twice", "error")
        return
      }
      var data = {
        link_id: this.campaign.link_id,
        uname: this.$route.params.user,
        donation_id: donation.id
      }
      if (this.$oauth.isAuthenticated()) {
        this.$http.post('api/campaign/donation/like', data)
                  .then(response => {
                    swal({
                        title: "Donation Liked!",
                        text: 'You have liked this Donation',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "ok",
                        closeOnConfirm: true,
                      },
                      function(isConfirm) {
                        if (isConfirm) {
                          that.campaign.donations[index].likes.push(response.body.data)
                        }
                      });
                  })
                  .catch(e => {
                    swal("Like Failed!", "Please refresh the page and try again.", "error")
                  })
      }else{
        swal({
            title: "Not Login!",
            text: 'Please login to like this Donation',
            type: "error",
            showCancelButton: true,
            confirmButtonText: "Login",
            closeOnConfirm: false,
          },
          function(isConfirm) {
            if (isConfirm) {
              that.$router.push('/login')
            }
          });
      }
    },

  },
  mounted(){
    if (this.$oauth.isAuthenticated()) {
      this.comment.user.name = this.user.name
      this.comment.user.email = this.user.email
      this.comment.user.website = this.$app.url+'/profile/'+this.user.uname
    }
    if (this.$route.query.donated) {
      var that = this
      swal({
          title: "Payment Received",
          text: "Thanks for donating $"+this.$route.query.donated+" to this campaign.",
          type: "warning",
          showCancelButton: false,
          closeOnConfirm: true
        },
        function(isConfirm) {
          if (isConfirm) {
            that.$router.push(that.$route.path)
          }
        });
    }
  }
}
</script>
<style lang="css">
#campaign .post-thumb {
  height: 360px !important;
}
.fluid-width-video-wrapper {
  max-height: 360px  !important;
  padding-top: 53% !important;
}
.toolbar #share-on-social .styled-icons.icon-dark span a{
  height: 0px;
  color: #000 !important;
  margin-bottom: 50px;
}
#toolbar.toolbar #share-on-social span a:hover{
  color: #ccc !important;
}
#share-on-social{
  margin-top: -30px;
}
#campaign .supporter-info .fave-contain .fa-heart {
 font-size: 1.4rem;
}
</style>
