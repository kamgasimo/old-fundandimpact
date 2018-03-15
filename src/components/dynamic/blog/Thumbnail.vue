<template>
  <div id="blog-thumbnail">
    <div class="item">
      <article class="post clearfix maxwidth600 mb-sm-30 wow fadeInRight" data-wow-delay=".2s">
        <div class="entry-header">
          <div class="post-thumb thumb">
            <img v-if="blog.media && blog.media[0] && blog.media[0].url" class="img-responsive img-fullwidth"alt="" :src="blog.media[0].url">
          </div>
          <div v-if="blog.media && blog.media[0]" class="entry-meta meta-absolute text-center pl-15 pr-15">
            <div class="display-table">
              <div class="display-table-cell">
                <ul>
                  <li><a class="text-white" @click="likeBlog()"><i class="fa fa-thumbs-o-up"></i> {{blog.likes.length}} <br> <span v-lang.likes>Likes</span></a></li>
                  <li class="mt-20"><router-link class="text-white" :to="blog.link+'#comments'"><i class="fa fa-comments-o"></i> {{blog.comments.length}} <br> <span v-lang.comments>comments</span></router-link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="entry-content border-1px p-20">
          <h5 class="entry-title mt-0 pt-0"><router-link :to="blog.link" class="text-theme-colored">{{blog.title}}</router-link></h5>
          <p v-if="blog.intro" class="text-left mb-20 mt-15 font-13">{{blog.intro}} ...</p>
          <router-link class="btn btn-flat btn-dark btn-theme-colored btn-sm pull-left" :to="blog.link" v-lang.read_more>Read more</router-link>
          <ul class="list-inline entry-date pull-right font-12 mt-5">
            <li><a class="text-theme-colored" href="#">{{blog.user.name}}</a></li>
            <li><span class="text-theme-colored">{{blog.created_at | timeago}}</span></li>
          </ul>
          <div class="clearfix"></div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  name: "blog-thumbnail",
  props: ['blog', 'user'],
  data: function data() {
    return {

    }
  },
  methods: {
    likeBlog(){
      var that = this
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
    },
  }
}
</script>
<style lang="css">
</style>
