<template>
<div id="dashboard-review-updates" class="divider">
    <!-- dialog to edit update -->
  <div id="edit-dialog" class="modal-promo-box mfp-hide">
    <form method="post">
      <div class="twothirds-box extra-shadow pb-30" style="width: 100%;">
        <div id="update_title" class="one arw" data-txt="Hi Kamga, post an update" v-lang.edit_your_update>Edit your Update</div>
        <div class="form-group p-20">
          <label for="form_title"><span v-lang.update_title>Update Title</span><small>*</small></label>
          <p :class="{ 'control': true }">
              <input v-model="update.title" v-validate="'required'"  maxlength="55" :class="{'input form-control': true, 'is-danger': errors.has('title') }" name="title" type="text" placeholder="Example: Her first treatment was awesome.">
              <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
          </p>
          <input-counter v-bind:input.sync="update.title" v-bind:limit="55"></input-counter>
        </div>
        <label for="summernote" class="font-17 ml-20" v-lang.whats_up>What's Up?</label>
        <div id="summernote"></div>

        <div class="clear"></div>

        <div class="three no-border pt-30">
          <div v-if="!loading" class="lb1">
            <div class="lb2">
              <a @click="editUpdate()" id="post_update" class="btn btn_check next2" v-lang.save_changes>Save Changes</a>
            </div>
          </div>
          <div v-if="loading" class="loading3 show-on-load">
            <div class="loader"></div>
          </div>
        </div>

        <div class="clear"></div>
      </div>
      <!-- end update -->

    </form>
  </div>
  <div class="container container-main">
    <div class="row main-row pb-30">
      <div class="topbar"></div>
      <div class="col-md-4">
        <div class="panel panel-default p-0">
          <div class="panel-heading headbar light-bkgd" v-lang.campaign_reviews>Campaign Reviews</div>
          <div class="panel-body p-0">
            <div class="widget p-10 m-0">
              <ul class="list-border list theme-colored angle-double-right">
                <li>
                  <router-link v-if="campaign && campaign.link_id" :to="'/dashboard/'+campaign.link_id+'/review/donations'" v-lang.donations>Donations</router-link>
                </li>
                <li>
                  <router-link v-if="campaign && campaign.link_id" :to="'/dashboard/'+campaign.link_id+'/review/comments'" v-lang.comments>Comments</router-link>
                </li>
                <li>
                  <router-link v-if="campaign && campaign.link_id" :to="'/dashboard/'+campaign.link_id+'/review/updates'" v-lang.updates>Updates</router-link>
                </li>
                <li>
                  <router-link v-if="campaign && campaign.link" :to="campaign.link" v-lang.view_campaign>View Campaign</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div v-if="campaign.updates" class="panel panel-default p-0">
          <div class="panel-heading headbar light-bkgd">({{campaign.updates.length}}) <span v-lang.updates>Updates</span></div>
          <div class="panel-body p-0">
            <div class="widget p-0 m-0">
              <div id="feed">
                <paginate
                    name="updates"
                    :list="campaign.updates"
                    :per="3"
                  >
                  <div v-for="update1 in paginated('updates')" :key="update1.id" :id="'update-'+update1.id">
                    <div class="c_block">
                      <div class="deats">
                        <ul class="nav navbar-nav navbar-dropdown pull-right">
                          <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span v-lang.options>Options</span> <span class="fa fa-caret-down"></span></a>
                            <ul class="dropdown-menu">
                              <li>
                                <a class="popup-for-edit hide" href="#edit-dialog"><span v-lang.edit>Edit</span> <span class="glyphicon glyphicon-pencil pull-right"></span></a>
                                <a @click="getForm(update1)"><span v-lang.edit>Edit</span> <span class="glyphicon glyphicon-pencil pull-right"></span></a>
                              </li>
                              <li><a @click="deleteUpdate(update1)" class="text-danger"><span v-lang.delete>Delete</span> <span class="glyphicon glyphicon-remove pull-right"></span></a></li>
                            </ul>
                          </li>
                        </ul>
                        <div class="phot">
                          <img v-if="user.media && user.media[0] && user.media[0].url"alt="" :src="user.media[0].url">
                          <span v-if="user.subnames && user.media && user.media[0] && !user.media[0].url" class="no-img">
                            {{user.subnames[0].substr(0,1)}} {{user.subnames[1].substr(0,1)}}
                          </span>
                        </div>

                        <div class="gnline text-theme-colored title">{{update1.title}}</div>
                        <div class="nme">{{user.name}}</div>
                        <div class="tme">{{update1.created_at | timeago}}</div>
                        <div style="clear:both;"></div>
                      </div>
                      <div class="c_comment" style="word-wrap: break-word;" v-html="update1.update"></div>
                    </div>
                  </div>
                </paginate>
              <div id="pagination_bar" class="">
                <paginate-links for="updates" :limit="2" :show-step-links="true" :async="true" :classes="{ 'ul': 'pagination' }" class="theme-colored"></paginate-links>
                <span v-if="$refs.paginator">
                  <span v-lang.viewing>Viewing</span> {{$refs.paginator.pageUpdatesCount}} <span v-lang.results>results</span>
                </span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "dashboard-review-updates",
  props: ['campaign', 'user', 'deleteCampaign'],
  components: {},
  data: function data() {
    return {
      paginate: ['updates'],
      loading: false,
      update: {
        title: '',
        update: ''
      },
      editingUpdate: {}
    }
  },
  methods: {
    deleteUpdate(update){
      var that = this
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          if (isConfirm) {
            that.$http.delete('api/update/'+update.id)
              .then(response => {
                swal({
                    title: "Deleted!",
                    text: "The update has been deleted.",
                    type: "success",
                    closeOnConfirm: true,
                  },
                  function(isConfirm) {
                    var index = that.campaign.updates.indexOf(update);
                    that.campaign.updates.splice(index, 1)
                  }
                );
              })
              .catch(e => {
                console.log(e);
                if (e.status === 404) {
                  swal({
                      title: "Deleted!",
                      text: "The update has been deleted.",
                      type: "success",
                      closeOnConfirm: true,
                    },
                    function(isConfirm) {
                      var index = that.campaign.updates.indexOf(update);
                      that.campaign.updates.splice(index, 1)
                    }
                  );
                }
              })
            } else {
              swal({
                  title: "Cancelled!",
                  text: "The update is safe :)",
                  type: "error",
                  closeOnConfirm: true,
                }
              );
            }
        })
    },
    editUpdate() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var update = $('#summernote').summernote('code');
          // var update = localStorage.getItem('clean');
          if ($('#summernote').summernote('isEmpty')) {
              swal("Update Not Provided!", "Please write something before trying to post.", "warning")
          }else{
            if ($(".note-editable").text().length < 300) {
              swal("Text too short!", "Your update should be atleast 300 characters long.", "warning")
            }else{
              this.loading = true
              var sanitizeHtml = require('sanitize-html');
              // alert(update);
              var options = {
                allowedTags: [ 'h1', 'h2', 'img', 'video', 'table', 'iframe', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
                'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
                'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre' ],
                allowedAttributes: false,
                allowedSchemes: [ 'data', 'http', 'https', 'ftp', 'mailto' ],
              };
              var clean = sanitizeHtml(update, options);
              // the current editing update
              var update = this.editingUpdate
              if (clean == update.update && this.update.title == update.title) {
                swal("Nothing Changed!", "Can't save you update, you haven't made any change.", "warning")
                this.loading = false
                return false
              }
              var data = {
                title: this.update.title,
                update: clean,
                id: update.id
              }
              // localStorage.setItem('clean', clean);
              this.$http.put('api/update', data)
                        .then(response => {
                          this.loading = false;
                          var that = this;
                          swal({
                              title: "Great Job!!",
                              text: 'You edited your update',
                              type: "success",
                              showCancelButton: false,
                              confirmButtonColor: "rgb(255,175,0)",
                              cancelButtonColor: "rgb(255,0,0)",
                              confirmButtonText: "ok",
                              closeOnConfirm: true,
                            },
                            function(isConfirm) {
                              if (isConfirm) {
                                var index = that.campaign.updates.indexOf(update);
                                that.campaign.updates[index] = response.body.data
                                if (that.$route.query.updated) {
                                  that.$router.push(that.$route.path+'?updated2=true')
                                }else{
                                  that.$router.push(that.$route.path+'?updated=true')
                                }
                                $('.mfp-close').click()
                              }
                            });
                        })
                        .catch(e => {
                          this.loading = false
                          var that = this
                          swal({
                              title: "Ooup!! Something went wrong. ",
                              text: 'We could not save your changes',
                              type: "error",
                              showCancelButton: true,
                              confirmButtonColor: "rgb(255,175,0)",
                              confirmButtonText: "Retry",
                              closeOnConfirm: false
                            },
                            function(isConfirm) {
                              if (isConfirm) {
                                that.editUpdate()
                              }
                            });
                        })
              // this.loading = false
            }
          }
        }else{
          $('body').scrollTop(0)
        }
      })
    },
    getForm(update){
      this.update.title = update.title
      this.editingUpdate = update
      $('#summernote').summernote({
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true // set focus to editable area after initializing summernote
      });
    $('#summernote').summernote('code', update.update);
      $('.popup-for-edit').click()
    }
  },
  updated() {
    setTimeout(function () {
      $('.popup-for-edit').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#title',

        // When element is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
          beforeOpen: function() {
            if($(window).width() < 700) {
              this.st.focus = false;
            } else {
              this.st.focus = '#title';
            }
          }
        }
      });
    }, 0)
  }
}
</script>
<style lang="css">
#dashboard-review-updates .container .row.main-row{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#dashboard-review-updates .col-md-8{
  background: transparent !important;
}
#dashboard-review-updates .twothirds-box {
  width: 100%;
}

#dashboard-review-updates .container-main{
  width: 80%;
  margin: auto;
}
#dashboard-review-updates .list-border a.active{
  color: black !important;
}
#dashboard-review-updates .modal-promo-box {
  max-width: 800px;
}
</style>
