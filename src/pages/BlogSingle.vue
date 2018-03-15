<template>
<div id="blog-single">
  <!-- Start main-content -->
  <div class="main-content">
    <!-- Section: inner-header -->
    <section class="inner-header divider layer-overlay overlay-dark" data-bg-img="/src/assets/images/bg/bg2.jpg">
      <div class="container pt-30 pb-30">
        <!-- Section Content -->
        <div class="section-content text-center">
          <div class="row">
            <div class="col-md-6 col-md-offset-3 text-center">
              <h2 class="text-theme-colored font-36">Blog Post</h2>
              <ol class="breadcrumb text-center mt-10 white">
                <li><a href="#">Home</a></li>
                <li><a href="#">Blog</a></li>
                <li class="active">{{blog.title}}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section: Blog -->
    <section>
      <div class="container mt-30 mb-30 pt-30 pb-30">
        <div class="row">
          <div class="col-md-10 col-md-offset-1">
            <div class="blog-posts single-post">
              <article class="post clearfix mb-0">
                <div class="entry-header">
                  <div class="post-thumb thumb">
                    <img v-if="blog.media && blog.media[0] && blog.media[0].url" class="img-responsive img-fullwidth"alt="" :src="blog.media[0].url">
                  </div>
                  <div v-if="blog.media && blog.media[0]" class="entry-meta meta-absolute text-center pl-15 pr-15">
                    <div v-if="blog.likes || blog.comments" class="display-table">
                      <div class="display-table-cell">
                        <ul>
                          <li><a @click="likeBlog()" class="text-white"><i class="text-white fa fa-thumbs-o-up"></i> {{blog.likes.length}} <br> Likes</a></li>
                          <li class="mt-20"><a class="text-white" href="#comment-box"><i class="fa fa-comments-o text-white"></i> {{blog.comments.length}} <br> comments</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="entry-title pt-0">
                  <h3><router-link v-if="blog && blog.link" :to="blog.link" class="text-theme-colored">{{blog.title}}</router-link></h3>
                </div>
                <div v-if="blog.user" class="entry-meta">
                  <ul class="list-inline">
                    <li>Posted: <span class="text-theme-colored">{{blog.created_at | timeago}}</span></li>
                    <li>By: <span v-if="blog.user" class="text-theme-colored">{{blog.user.name}}</span></li>
                  </ul>
                </div>
                <div class="entry-content mt-10">
                  <div class="" v-html="blog.message">
                    <!-- blog post -->
                  </div>
                  <div class="mt-30 mb-0">
                    <h5 class="pull-left mt-10 mr-20 text-theme-colored">Share:</h5>
                    <ul class="styled-icons icon-circled m-0">
                      <share-on-social :url="$app.url+blog.link"></share-on-social>
                    </ul>
                  </div>
                </div>
              </article>
              <div v-if="blog.user" class="author-details media-post">
                <router-link v-if="blog.user" :to="'/profile/'+blog.user.uname" class="post-thumb mb-0">
                  <img v-if="blog.user.media && blog.user.media[0] && blog.user.media[0].url" class="img-thumbnail" style="width: 135px;" alt="" :src="blog.user.media[0].url">
                </router-link>
                <div class="post-right">
                  <h5 class="post-title mt-0 mb-0"><router-link v-if="blog.user" :to="'/profile/'+blog.user.uname" class="font-18">{{blog.user.name}}</router-link></h5>
                  <p v-html="blog.user_intro"></p>

                </div>
                <div class="clearfix"></div>
              </div>
              <div id="comments" class="dropdown-container">
                <h5 class="widget-title line-bottom">Recent Comments</h5>
              </div>
              <!--/.dropdown-container-->
              <div class="row column  mt-20 mb-20">
                <div class="mr mb10 ml">
                  <a href="#comment-box" class="button secondary expanded text-theme-colored">
                    Leave a Comment
                  </a>
                </div>
              </div>
              <div class="row js-comments-contain">
                <div class="column showcontrol-comments hori-center" style="width: 80%; margin:auto;">
                  <div class="supporters-list">
                    <paginate
                        name="comments"
                        :list="blog.comments"
                        :per="5"
                      >
                      <div v-for="comment in paginated('comments')" :key="comment.id" class="supporter js-comment-content mb-30">
                        <div class="avatar-contain">
                          <img class="thumbnail media-round" :src="(!comment.user) ? '/src/assets/images/img-default.jpg' : (comment.user.media) ? comment.user.media[0].url: '/src/assets/images/img-default.jpg'" alt="">
                        </div>
                        <div class="supporter-info">
                          <div class="row collapse">
                            <div class="column small-10 medium-11 text-black">
                              <div class="supporter-name">
                                {{comment.name}}
                              </div>
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
                          </div>
                        </div>
                        <!--/.supporter-info-->

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
                        Viewing {{$refs.paginator.pageItemsCount}} results
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div id="comment-box" class="comment-box p-30">
                <div class="row">
                  <div class="col-sm-12">
                    <h5 class="widget-title line-bottom">Leave a Comment</h5>
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
                            <button @click="submitComment()" v-if="!loading" type="button" class="btn next2 btn-flat pull-right m-0" >Submit Comment</button>
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
  name: "blog-single",
  props: ['publicData', 'user'],
  components: {
    'share-on-social': ShareOnSocial
  },
  data: function data() {
    return {
      blog: {
        comments: []
      },
      paginate: ['comments'],
      comment: {
        user: {
          name: '',
          email: '',
          website: '',
          comment: '',
        }
      },
      loading: false
    }
  },
  watch: {
    publicData: function (val) {
      var that = this
      if (this.publicData && this.publicData.blogs) {
        var blog  = this.publicData.blogs.filter(function(o){
          return o.link == that.$route.path;
        });
        this.blog = blog[0]
      }

    },
    user: function (val) {
      this.comment.user.name = this.user.name
      this.comment.user.email = this.user.email
      this.comment.user.website = this.$app.url+'/profile/'+this.user.uname
    }
  },
  methods: {
    submitComment(){
      this.$validator.validateAll().then((result) => {
          if (result) {
            this.loading = true
            var data = {
              name: this.comment.user.name,
              email: this.comment.user.email,
              website: this.comment.user.website,
              comment: this.comment.user.comment,
              link_id: this.blog.link_id
            }
            var that = this
            if (this.$oauth.isAuthenticated()) {
              this.$http.post('api/blog/comment/auth', data)
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
                                that.blog.comments.push(response.body.data)
                              }
                            });
                        })
                        .catch(e => {
                          this.loading = false
                          swal("Comment Failed!", "Please refresh the page and try again.", "error")
                        })
            }else{
              this.$http.post('api/blog/comment', data)
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
                                that.blog.comments.push(response.body.data)
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
    likeBlog(){
      var that = this
      if (this.blog && this.blog.likes) {
        var liker  = this.blog.likes.filter(function(o){
          return o.user_id == that.user.id;
        });
        if (liker.length > 0) {
          swal("Like Failed!", "You can't like this twice", "error")
          return
        }
        var data = {
          link_id: this.blog.link_id
        }
        var that = this
        if (this.$oauth.isAuthenticated()) {
          this.$http.post('api/blog/like', data)
                    .then(response => {
                      swal({
                          title: "blog Liked!",
                          text: 'You have liked this blog post',
                          type: "success",
                          showCancelButton: false,
                          confirmButtonText: "ok",
                          closeOnConfirm: true,
                        },
                        function(isConfirm) {
                          if (isConfirm) {
                            that.blog.likes.push(response.body.data)
                          }
                        });
                    })
                    .catch(e => {
                      swal("Like Failed!", "Please refresh the page and try again.", "error")
                    })
        }else{
          swal({
              title: "Not Login!",
              text: 'Please login to like this blog',
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
      }
    },
    likeComment(comment){
      var that = this
      var index = that.blog.comments.indexOf(comment)
      var liker  = this.blog.comments[index].likes.filter(function(o){
        return o.user_id == that.user.id;
      });
      if (liker.length > 0) {
        swal("Like Failed!", "You can't like this twice", "error")
        return
      }
      var data = {
        link_id: this.blog.link_id,
        comment_id: comment.id
      }
      if (this.$oauth.isAuthenticated()) {
        this.$http.post('api/blog/comment/like', data)
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
                          that.blog.comments[index].likes.push(response.body.data)
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
  },
  mounted(){
    var that = this
    if (this.publicData && this.publicData.blogs) {
      var blog  = this.publicData.blogs.filter(function(o){
        return o.link == that.$route.path;
      });
      this.blog = blog[0]
    }


    if (this.$oauth.isAuthenticated()) {
      this.comment.user.name = this.user.name
      this.comment.user.email = this.user.email
      this.comment.user.website = this.$app.url+'/profile/'+this.user.uname
    }
  }
}
</script>
<style lang="css">
#blog-single .supporter{
  border-bottom: 1px solid #d3d3d3;
}
</style>
