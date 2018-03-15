<template>
<div id="faq-page">
  <section class="inner-header divider layer-overlay overlay-dark" data-bg-img="/src/assets/images/bg/bg2.jpg" style="background-image: url(&quot;/src/assets/images/bg/bg2.jpg&quot;);">
    <div class="container pt-30 pb-30">
      <!-- Section Content -->
      <div class="section-content text-center">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center">
            <h2 class="text-theme-colored font-36" v-lang.frequently_asked_questions>Frequently Asked Questions.</h2>
            <ol class="breadcrumb text-center mt-10 white">
              <li>
                <router-link to="/" v-lang.home>Home</router-link>
              </li>
              <li class="active" v-lang.frequently_asked_questions>Frequently Asked Questions.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-for="category in publicData.faqCategories" :key="category.id" v-if="($route.params.topic && ($route.params.topic == category.link_id)) || !$route.params.topic">
    <div class="link-bar top">{{category.name}}</div>
    <section class="category-qestions mt-0">
      <div class="container pt-10">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div :id="'accordion'+category.id" class="panel-group accordion transparent">
              <div v-for="faq in category.faqs" :key="faq.id"class="panel">
                <div class="panel-title">
                  <a :data-parent="'#accordion'+category.id" data-toggle="collapse" :href="'#accordion'+category.id+faq.id" class="collapsed" aria-expanded="false">
                    <span class="open-sub"></span>
                    <strong class="text-theme-colored">{{faq.title}}</strong>
                  </a>
                </div>
                <div :id="'accordion'+category.id+faq.id" class="panel-collapse collapse in" role="tablist" aria-expanded="false">
                  <div class="panel-content">
                    <p>{{faq.intro}}</p>
                    <router-link :to="faq.link" class="text-theme-colored" v-lang.see_more>See More</router-link>
                  </div>
                </div>
              </div>
              <div class="no-faq white-box-large-only container p-20" v-if="category.faqs.length == 0">
                <div class="row mt-10">
                  <div class="fs-25 text-center mb-20 column small-12 large-10 large-centered" v-lang.no_question_yet>No Question Yet!</div>
                </div>
                <div class="">
                  <div class="column small-12 large-10 large-centered">
                    <div class="column mb-20 text-center small-centered medium-8 large-12">
                      <router-link class="button expanded primary small" :to="'/help/'+category.link_id" v-lang.ask_one>Ask One</router-link>
                      <!-- <div class="read-more text-center mb-10"><a href="/mvc.php?route=contact/suggest">Missing a donation? Please contact us!</a></div> -->
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
  <section v-if="$route.params.topic" class="container mt-70">
    <div class="link-bar" style="width: 90%;" v-lang.faq_categories>FAQ Categories</div>
    <div class="row">
      <div class="col-sm-6">
        <router-link v-for="(cat, index) in publicData.faqCategories" :key="cat.id" v-if="index <= ((publicData.faqCategories.length - 1) / 2) " :to="cat.link" class="link-bar btn text-theme-colored mt-20">{{cat.name}}</router-link>
      </div>
      <div class="col-sm-6">
        <router-link v-for="(cat, index) in publicData.faqCategories" :key="cat.id" v-if="index > ((publicData.faqCategories.length - 1) / 2) " :to="cat.link" class="link-bar btn text-theme-colored mt-20">{{cat.name}}</router-link>
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
  name: "faq-page",
  props: ['publicData'],
  components: {
    'fund-raising-ideas': FundRaisingIdeas,
    'faq': Faq
  },
  data: function data() {
    return {
      faqs: true,
    }
  }
}
</script>
<style lang="css">
.fs-25{
  font-size: 25px;
}
.cd-timeline-content::before {
  border-left-color: #f1f1f1;
}
.cd-timeline-block:nth-child(even) .cd-timeline-content::before {
    border-right-color: #f1f1f1;
}
#faq-page .link-bar{
  width: 65%;
  margin: auto;
}
#faq-page .link-bar.top{
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
