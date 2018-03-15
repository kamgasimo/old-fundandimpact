<template>
<div id="dashboard-review-donations" class="divider">
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
        <div class="panel panel-default p-0">
          <div v-if="campaign.donations" class="panel-heading headbar light-bkgd">({{campaign.donations.length}}) <span v-lang.donations>Donations</span></div>
          <div class="panel-body p-0">
            <div class="widget p-10 m-0">
              <div id="feed">
                <paginate
                  v-if="campaign.donations"
                    name="donations"
                    :list="campaign.donations"
                    :per="5"
                  >
                  <div v-for="donation in paginated('donations')" :key="donation.id" :id="'donation-'+donation.id">
                    <div class="c_block">
                      <div class="deats">
                        <ul class="nav navbar-nav navbar-dropdown pull-right">
                          <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span v-lang.options>Options</span> <span class="fa fa-caret-down"></span></a>
                            <ul class="dropdown-menu">
                              <li><a @click="deleteDonation(donation)" class="text-danger"><span v-lang.refuse_donation>Refuse Donation</span> <span class="glyphicon glyphicon-remove pull-right"></span></a></li>
                            </ul>
                          </li>
                        </ul>
                        <div class="phot">
                          <img v-if="donation.user && donation.user.media[0]" class="thumbnail media-round" :src="donation.user.media[0].url" alt="">
                        </div>

                        <div class="gnline"><b>${{donation.amount}}</b></div>
                        <div class="nme" v-if="donation.user"><router-link v-if="donation.user.uname" :to="'/profile/'+donation.user.uname">{{donation.user.name}}</router-link></div>
                        <div class="nme" v-else>
                          {{donation.name}}
                        </div>
                        <div class="tme">{{donation.created_at | timeago}}</div>
                        <div style="clear:both;"></div>
                      </div>
                      <div class="c_comment" style="word-wrap: break-word;">{{donation.comment}}</div>
                    </div>
                  </div>
                </paginate>
                <div id="pagination_bar" class="">
                  <paginate-links for="donations" :limit="2" :show-step-links="true" :async="true" :classes="{ 'ul': 'pagination' }" class="theme-colored"></paginate-links>
                  <span v-if="$refs.paginator">
                    <span v-lang.viewing>Viewing</span> {{$refs.paginator.pageDonationsCount}} <span v-lang.results>results</span>
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
  name: "dashboard-review-donations",
  props: ['campaign', 'user', 'deleteCampaign'],
  components: {},
  data: function data() {
    return {
      paginate: ['donations'],
      loading: false
    }
  },
  methods: {
    deleteDonation(donation){
      var that = this
      swal({
          title: "Are you sure?",
          text: "You will lost the donation money!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, refuse the money!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          if (isConfirm) {
            that.$http.delete('api/donation/'+donation.id)
              .then(response => {
                swal({
                    title: "Deleted!",
                    text: "The donation has been deleted.",
                    type: "success",
                    closeOnConfirm: true,
                  },
                  function(isConfirm) {
                    var index = that.campaign.donations.indexOf(donation);
                    that.campaign.donations.splice(index, 1)
                  }
                );
              })
              .catch(e => {
                console.log(e);
                if (e.status === 404) {
                  swal({
                      title: "Deleted!",
                      text: "The donation has been deleted.",
                      type: "success",
                      closeOnConfirm: true,
                    },
                    function(isConfirm) {
                      var index = that.campaign.donations.indexOf(donation);
                      that.campaign.donations.splice(index, 1)
                    }
                  );
                }
              })
            } else {
              swal({
                  title: "Cancelled!",
                  text: "The donation is safe :)",
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
#dashboard-review-donations .container .row.main-row{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#dashboard-review-donations .col-md-8{
  background: transparent !important;
}
#dashboard-review-donations .twothirds-box {
  width: 100%;
}

#dashboard-review-donations .container-main{
  width: 80%;
  margin: auto;
}
#dashboard-review-donations .list-border a.active{
  color: black !important;
}
</style>
