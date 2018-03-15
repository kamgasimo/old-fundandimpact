<template>
<div id="afund-raising-ideas">
  <section class="inner-header divider layer-overlay overlay-dark" data-bg-img="/src/assets/images/bg/bg2.jpg" style="background-image: url(&quot;/src/assets/images/bg/bg2.jpg&quot;);">
    <div class="container pt-30 pb-30">
      <!-- Section Content -->
      <div class="section-content text-center">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center">
            <h2 class="text-theme-colored font-36" v-lang.fundraiser_toolkit>Fundraiser Toolkit</h2>
            <ol class="breadcrumb text-center mt-10 white">
              <li>
                <router-link to="/" v-lang.home>Home</router-link>
              </li>
              <li class="active" v-lang.fundraising_articles>Fundraising Articles</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="" v-if="!$route.params.topic">
    <div class="link-bar top" v-lang.popular_articles>Popular Articles</div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-10 col-md-offset-1">
            <div id="accordion0" class="panel-group accordion transparent">
                <div v-for="category in publicData.articleCategories" :key="category.id">
                  <div v-for="article in category.articles" :key="article.id" class="panel">
                    {{setIsArticle()}}
                    <div class="panel-title">
                      <a data-parent="#accordion0" data-toggle="collapse" :href="'#accordion0'+article.id" class="collapsed" aria-expanded="false">
                        <span class="open-sub"></span>
                        <strong class="text-theme-colored">{{article.title}}</strong>
                      </a>
                    </div>
                    <div :id="'accordion0'+article.id" class="panel-collapse collapse in" role="tablist" aria-expanded="false">
                      <div class="panel-content">
                        <p>{{article.intro}}</p>
                        <router-link :to="article.link" class="text-theme-colored" v-lang.see_more>See More</router-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="no-article-yet alert alert-warning" v-if="!isArticle">
                  <div class="row mt-10">
                    <div class="fs-25 text-center mb-20 column small-12 large-10 large-centered" v-lang.no_article_yet>No Article Yet!</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-for="category in publicData.articleCategories" :key="category.id" v-if="$route.params.topic && ($route.params.topic == category.link_id)">
    <div class="link-bar top">{{category.name}}</div>
    <section class="category-qestions mt-0">
      <div class="container pt-10">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div :id="'accordion'+category.id" class="panel-group accordion transparent">
              <div v-for="article in category.articles" :key="article.id"class="panel">
                <div class="panel-title">
                  <a :data-parent="'#accordion'+category.id" data-toggle="collapse" :href="'#accordion'+category.id+article.id" class="collapsed" aria-expanded="false">
                    <span class="open-sub"></span>
                    <strong class="text-theme-colored">{{article.title}}</strong>
                  </a>
                </div>
                <div :id="'accordion'+category.id+article.id" class="panel-collapse collapse in" role="tablist" aria-expanded="false">
                  <div class="panel-content">
                    <p>{{article.intro}}</p>
                    <router-link :to="article.link" class="text-theme-colored" v-lang.see_more>See More</router-link>
                  </div>
                </div>
              </div>
              <div class="no-article alert alert-warning p-20" v-if="category.articles.length == 0">
                <div class="row mt-10">
                  <div class="fs-25 text-center mb-20 column small-12 large-10 large-centered" v-lang.no_article_yet>No Article Yet!</div>
                  <div class="text-center" v-lang.under_this_topic>
                    under this Topic
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <section class="container">
    <div class="link-bar" style="width: 90%;" v-lang.explore_topics>Explore Topics</div>
    <div class="row">
      <div class="col-sm-6">
        <router-link v-for="(cat, index) in publicData.articleCategories" :key="cat.id" v-if="index <= ((publicData.articleCategories.length - 1) / 2) " :to="cat.link" class="link-bar btn text-theme-colored mt-20">{{cat.name}}</router-link>
      </div>
      <div class="col-sm-6">
        <router-link v-for="(cat, index) in publicData.articleCategories" :key="cat.id" v-if="index > ((publicData.articleCategories.length - 1) / 2) " :to="cat.link" class="link-bar btn text-theme-colored mt-20">{{cat.name}}</router-link>
        <router-link to="/ideas" class="link-bar btn text-theme-colored mt-20" v-lang.popular_articles>Popular Articles</router-link>
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
  name: "afund-raising-ideas",
  props: ['publicData'],
  components: {
    'fund-raising-ideas': FundRaisingIdeas,
    'faq': Faq
  },
  data: function data() {
    return {
      isArticle: false,
    }
  },
  methods: {
    setIsArticle(){
      // alert('in')
      this.isArticle = true
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
#afund-raising-ideas .link-bar{
  width: 60%;
  margin: auto;
}
#afund-raising-ideas .link-bar.top{
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
