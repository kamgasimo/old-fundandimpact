<template>
<div id="afund-raising-article">
  <section class="inner-header divider layer-overlay overlay-dark" data-bg-img="/src/assets/images/bg/bg2.jpg" style="background-image: url(&quot;/src/assets/images/bg/bg2.jpg&quot;);">
    <div class="container pt-30 pb-30">
      <!-- Section Content -->
      <div class="section-content text-center">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center">
            <h2 v-if="$route.meta.forFaq" class="text-theme-colored font-36">FAQ</h2>
            <h2 v-else class="text-theme-colored font-36">Fundraising Article</h2>
            <ol class="breadcrumb text-center mt-10 white">
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <li>
                <router-link :to="category.link">{{category.name}}</router-link>
              </li>
              <li class="active">{{article.title}}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="link-bar top">{{article.title}}</div>
  <section class="container pl-120 pr-100 mt-70">
    <div class="row" v-html="article.message">

    </div>
  </section>
  <section v-if="$route.meta.forFaq" class="container mt-70">
    <div class="link-bar" style="width: 90%;">FAQ Categories</div>
    <div class="row">
      <div class="col-sm-6">
        <router-link v-for="(cat, index) in publicData.faqCategories" :key="cat.id" v-if="index <= ((publicData.faqCategories.length - 1) / 2) " :to="cat.link" class="link-bar btn text-theme-colored mt-20">{{cat.name}}</router-link>
      </div>
      <div class="col-sm-6">
        <router-link v-for="(cat, index) in publicData.faqCategories" :key="cat.id" v-if="index > ((publicData.faqCategories.length - 1) / 2) " :to="cat.link" class="link-bar btn text-theme-colored mt-20">{{cat.name}}</router-link>
      </div>
    </div>
  </section>
  <section v-else class="container mt-70">
    <div class="link-bar" style="width: 90%;">Explore Topics</div>
    <div class="row">
      <div class="col-sm-6">
        <router-link v-for="(cat, index) in publicData.articleCategories" :key="cat.id" v-if="index <= ((publicData.articleCategories.length - 1) / 2) " :to="cat.link" class="link-bar btn text-theme-colored mt-20">{{cat.name}}</router-link>
      </div>
      <div class="col-sm-6">
        <router-link v-for="(cat, index) in publicData.articleCategories" :key="cat.id" v-if="index > ((publicData.articleCategories.length - 1) / 2) " :to="cat.link" class="link-bar btn text-theme-colored mt-20">{{cat.name}}</router-link>
        <router-link to="/ideas" class="link-bar btn text-theme-colored mt-20">Popular Articles</router-link>
      </div>
    </div>
  </section>
  <section class="container  mt-80">
    <fund-raising-ideas></fund-raising-ideas>
    <faq></faq>
  </section>
</div>
</template>
<script>
import FundRaisingIdeas from '../components/call-to-action/Toolkit.vue'
import Faq from '../components/call-to-action/Faq.vue'
export default {
  name: "afund-raising-article",
  props: ['publicData'],
  components: {
    'fund-raising-ideas': FundRaisingIdeas,
    'faq': Faq
  },
  data: function data() {
    return {
      article: {},
      category: {}
    }
  },
  watch: {
    publicData: function (val) {
      if (this.$route.meta.forFaq) {
        var that = this
        var category = this.publicData.faqCategories.filter(function(o){
          return o.link_id == that.$route.params.topic;
        })
        this.category = category[0]
        var articles = category[0].faqs.filter(function(o){
          return o.link == that.$route.path;
        });
        // alert(JSON.stringify(category[0].faqs))
        this.article = articles[0]
      }else{
        var that = this
        var category = this.publicData.articleCategories.filter(function(o){
          return o.link_id == that.$route.params.topic;
        })
        this.category = category[0]
        var articles = category[0].articles.filter(function(o){
          return o.link == that.$route.path;
        });
        // alert(JSON.stringify(category[0].faqs))
        this.article = articles[0]
      }
    }
  },
  mounted(){
    if (this.publicData) {
      if (this.$route.meta.forFaq) {
        var that = this
        var category = this.publicData.faqCategories.filter(function(o){
          return o.link_id == that.$route.params.topic;
        })
        this.category = category[0]
        var articles = category[0].faqs.filter(function(o){
          return o.link == that.$route.path;
        });
        // alert(JSON.stringify(category[0].faqs))
        this.article = articles[0]
      }else{
        var that = this
        var category = this.publicData.articleCategories.filter(function(o){
          return o.link_id == that.$route.params.topic;
        })
        this.category = category[0]
        var articles = category[0].articles.filter(function(o){
          return o.link == that.$route.path;
        });
        // alert(JSON.stringify(category[0].faqs))
        this.article = articles[0]
      }
    }
  }
}
</script>
<style lang="css">
.cd-timeline-content::before {
  border-left-color: #f1f1f1;
}
.cd-timeline-block:nth-child(even) .cd-timeline-content::before {
    border-right-color: #f1f1f1;
}
#afund-raising-article .link-bar{
  width: 80%;
  margin: auto;
}
#afund-raising-article .link-bar.top{
  margin-top: -25px;
}
.hiw-step h1 {
    font-size: 1.45rem;
}
.cd-timeline-content h2{
  color: rgba(255, 178, 0, 1);
}
.cd-timeline-img .fa{
  margin: 18px;
  color: white;
  font-size: 1.7rem;
}
</style>
