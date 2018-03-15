<template>
<div id="dashboard-review-comments" class="divider">
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
        <div v-if="campaign.comments" class="panel panel-default p-0">
          <div class="panel-heading headbar light-bkgd">({{campaign.comments.length}}) <span v-lang.comments>Comments</span></div>
          <div class="panel-body p-0">
            <div class="widget p-0 m-0">
              <div id="feed">
                <paginate
                    name="comments"
                    :list="campaign.comments"
                    :per="5"
                  >
                  <div v-for="comment in paginated('comments')" :key="comment.id" :id="'comment-'+comment.id">
                    <div class="c_block">
                      <div class="deats">
                        <ul class="nav navbar-nav navbar-dropdown pull-right">
                          <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Options <span class="fa fa-caret-down"></span></a>
                            <ul class="dropdown-menu">
                              <li><a @click="deleteComment(comment)" href="#" class="text-danger"> <span v-lang.delete>Delete</span> <span class="glyphicon glyphicon-remove pull-right"></span></a></li>
                            </ul>
                          </li>
                        </ul>
                        <div class="phot">
                          <img class="thumbnail media-round" :src="(!comment.user) ? '/src/assets/images/img-default.jpg' : (comment.user.media) ? comment.user.media[0].url: '/src/assets/images/img-default.jpg'" alt="">
                        </div>

                        <!-- <div class="gnline">Comment</div> -->
                        <div class="nme" v-if="comment.user"><router-link :to="'/profile/'+comment.user.uname">{{comment.user.name}}</router-link></div>
                        <div class="nme" v-else>
                          {{comment.name}}
                        </div>
                        <div class="tme">{{comment.created_at | timeago}}</div>
                        <div style="clear:both;"></div>
                      </div>
                      <div class="c_comment" style="word-wrap: break-word;">{{comment.comment}}</div>
                    </div>
                  </div>
                </paginate>
                <paginate-links for="comments" :limit="2" :show-step-links="true" :async="true" :classes="{ 'ul': 'pagination' }" class="theme-colored"></paginate-links>
                <span v-if="$refs.paginator">
                  <span v-lang.viewing>Viewing</span> {{$refs.paginator.pageCommentsCount}} <span v-lang.results>results</span>
                </span>
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
  name: "dashboard-review-comments",
  props: ['campaign', 'user', 'deleteCampaign'],
  data: function data() {
    return {
      paginate: ['comments'],
      loading: false,
    }
  },
  methods: {
    deleteComment(comment){
      var that = this
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover this comment!",
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
            that.$http.delete('api/comment/'+comment.id)
              .then(response => {
                swal({
                    title: "Deleted!",
                    text: "The comment has been deleted.",
                    type: "success",
                    closeOnConfirm: true,
                  },
                  function(isConfirm) {
                    var index = that.campaign.comments.indexOf(comment);
                    that.campaign.comments.splice(index, 1)
                  }
                );
              })
              .catch(e => {
                console.log(e);
                if (e.status === 404) {
                  swal({
                      title: "Deleted!",
                      text: "The comment has been deleted.",
                      type: "success",
                      closeOnConfirm: true,
                    },
                    function(isConfirm) {
                      var index = that.campaign.comments.indexOf(comment);
                      that.campaign.comments.splice(index, 1)
                    }
                  );
                }
              })
            } else {
              swal({
                  title: "Cancelled!",
                  text: "The comment is safe :)",
                  type: "error",
                  closeOnConfirm: true,
                }
              );
            }
        })
    },
  },
  mounted() {

  }
}
</script>
<style lang="css">
#dashboard-review-comments .container .row.main-row{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#dashboard-review-comments .col-md-8{
  background: transparent !important;
}
#dashboard-review-comments .twothirds-box {
  width: 100%;
}

#dashboard-review-comments .container-main{
  width: 80%;
  margin: auto;
}
#dashboard-review-comments .list-border a.active{
  color: black !important;
}

</style>
