<template>
<div id="footer">
  <!-- Footer -->
  <footer id="footer" class="footer pb-0" data-bg-img="/src/assets/images/footer-bg.png" data-bg-color="#25272e">
    <div class="container pb-20">
      <div class="row multi-row-clearfix">
        <div class="col-sm-6 col-md-3">
          <div class="widget dark"> <img alt="" src="/src/assets/logo-hori.png">
            <p class="font-12 text-white fs-18 mb-10" v-lang.fundandimpact_intro>FundandImpact allows the world to reach out and impact one life at a time by donating to help and contribute funds for solutions to the problems faced as raised in the campaign. The notion behind the initiative is that together a bigger and
              better impact can be created in the life of others when we consider a problem affecting one person – as a problem affecting us all.</p>
            <router-link to="/about" class="text-gray font-12"><i class="fa fa-angle-double-right text-theme-colored"></i> <span v-lang.read_more>Read more</span></router-link>
            <ul class="styled-icons icon-dark mt-20">
              <li class="wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".1s" data-wow-offset="10"><a href="#" data-bg-color="#3B5998"><i class="fa fa-facebook"></i></a></li>
              <li class="wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".2s" data-wow-offset="10"><a href="#" data-bg-color="#02B0E8"><i class="fa fa-twitter"></i></a></li>
              <li class="wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".4s" data-wow-offset="10"><a href="#" data-bg-color="#A11312"><i class="fa fa-google-plus"></i></a></li>
              <li class="wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".5s" data-wow-offset="10"><a href="#" data-bg-color="#C22E2A"><i class="fa fa-youtube"></i></a></li>
            </ul>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="widget dark">
            <h5 class="widget-title line-bottom" v-lang.get_started>Get Started</h5>
            <ul class="list-border list theme-colored angle-double-right">

              <li>
                <router-link to="/tour" v-lang.how_it_works>How It Works</router-link>
              </li>
              <li>
                <router-link to="/pricing" v-lang.pricing_and_fees>Pricing and Fees</router-link>
              </li>
              <li>
                <router-link to="/faq" v-lang.common_questions>Common Questions</router-link>
              </li>
              <li>
                <router-link to="/success" v-lang.success_stories>Success Stories</router-link>
              </li>
              <li>
                <router-link to="/register" v-lang.sign_up_now>Sign Up Now</router-link>
              </li>
              <li>
                <router-link to="/terms" v-lang.terms_of_use>Terms of Use</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="widget dark">
            <h5 class="widget-title line-bottom" v-lang.popular_categories>Popular Categories</h5>
            <ul class="list-border list theme-colored angle-double-right">
              <li>
                <router-link to="/categories/medical-fundraising" v-lang.medical_fundraising>Medical Fundraising</router-link>
              </li>
              <li>
                <router-link to="/categories/funeral-memorial-fundraising" v-lang.memorial_fundraising>Memorial Fundraising</router-link>
              </li>
              <li>
                <router-link to="/categories/charity-fundraising" v-lang.charity_fundraising>Charity Fundraising</router-link>
              </li>
              <li>
                <router-link to="/categories/school-fundraising" v-lang.education_fundraising>Education Fundraising</router-link>
              </li>
              <li>
                <router-link to="/categories/business-fundraising" v-lang.business_fundraising>Business Fundraising</router-link>
              </li>
              <li>
                <router-link to="/categories/volunteer-fundraising" v-lang.volunteer_fundraising>Volunteer Fundraising</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="widget dark">
            <h5 class="widget-title line-bottom" v-lang.site_language>Site Language</h5>
            <div class="btn-group">
              <button type="button" class="btn btn-default btn-lg">
            	<img id="imgBtnSel" src="" alt="..." class="img-thumbnail icon-medium">  
            	<span id="lanBtnSel" v-if="language == 'en'">ENG</span>
              <span id="lanBtnSel" v-else-if="language == 'fr'">FRA</span>
              <span id="lanBtnSel" v-else>ENG</span></button>
              <button type="button" class="btn btn-default btn-lg dropdown-toggle lang-toggle" data-toggle="dropdown" aria-expanded="false">
            	    <span class="caret"></span>
            	  </button>
              <ul class="dropdown-menu" role="menu">
                <li><a id="btnFra" href="#" class="language"><img id="imgBtnFra" src="" alt="..." class="img-thumbnail icon-small">  <span id="lanBtnFra">Francais</span></a></li>
                <li><a id="btnEng" href="#" class="language"><img id="imgBtnEng" src="" alt="..." class="img-thumbnail icon-small">  <span id="lanBtnEng">English</span></a></li>
              </ul>
            </div>
          </div>
          <div class="widget dark">
            <h5 class="widget-title line-bottom" v-lang.quick_contact>Quick Contact</h5>
            <ul class="list-border">
              <li><a href="javascript:void(0)">+(237) 653 343 173</a></li>
              <li><a href="javascript:void(0)">info@fundandimpact.com</a></li>
            </ul>
            <p class="text-white mb-5 mt-15" v-lang.subscribe_to_our_newsletter>Subscribe to our newsletter</p>
            <form id="footer-mailchimp-subscription-form" class="newsletter-form mt-10">
              <label class="display-block" for="mce-EMAIL"></label>
              <div class="input-group">
                <input type="email" value="" name="EMAIL" placeholder="Your Email" class="form-control" data-height="37px" id="mce-EMAIL">
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-colored btn-theme-colored m-0"><i class="fa fa-paper-plane-o text-white"></i></button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-theme-colored p-20">
      <div class="row ">
        <div class="col-md-4 text-left">
          <p class="text-white font-11 m-0"> <span v-lang.powered_by>Powered by</span> <a href="http://kamgasimo.com">Kamga Simo Junior</a></p>
        </div>
        <div class="col-md-8 text-left">
          <p class="text-white font-11 m-0">Copyright &copy;2017 FundAndImpact. <span v-lang.all_rights_reserved>All Rights Reserved</span></p>
        </div>
      </div>
    </div>
  </footer>
  <a class="scrollToTop" href="#"><i class="fa fa-angle-up"></i></a>
</div>
</template>
<script>
export default {
  name: "footer",
  data: function data() {
    return {

    }
  },
  methods: {
    selectLang(lang){
      this.language = lang;
      localStorage.setItem('languageSelectedByUser', 1);
      window.location.reload();
    },
  },
  mounted() {
    var that = this
    $(document).ready(function() {
      // var language = window.navigator.languages[10] || [window.navigator.language || window.navigator.userLanguage];
      // alert(language);

      var engImgLink = "/src/assets/images/maps/britain.gif";
      var fraImgLink = "/src/assets/images/maps/france.gif";

      var imgBtnSel = $('#imgBtnSel');
      var imgBtnEng = $('#imgBtnEng');
      var imgBtnFra = $('#imgBtnFra');

      var spanBtnSel = $('#lanBtnSel');

      if(that.language == 'en'){
        imgBtnSel.attr("src", engImgLink);
      } else if(that.language == 'fr'){
        imgBtnSel.attr("src", fraImgLink);
      } else {
        imgBtnSel.attr("src", engImgLink);
      }

      imgBtnEng.attr("src", engImgLink);
      imgBtnFra.attr("src", fraImgLink);

      $(".language").on("click", function(event) {
        var currentId = $(this).attr('id');

        if (currentId == "btnEng") {
          // imgBtnSel.attr("src", engImgLink);
          // spanBtnSel.text("ENG");
          that.selectLang('en')
        } else if (currentId == "btnFra") {
          // imgBtnSel.attr("src", fraImgLink);
          // spanBtnSel.text("FRA");
          that.selectLang('fr')
        }

      });
    });
  }
}
</script>
<style lang="css">
.icon-small
{
   height:22px;
   margin:0;
 padding:0;
}

.icon-medium
{
   height:22px;
 margin:0;
 padding:0;
}
.lang-toggle{
  height:44px;
  margin:0;
  padding:0;
}
</style>
