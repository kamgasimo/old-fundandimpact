<template>
  <div id="comp-campaign-types">
    <section>
      <carousel :perPage="10" paginationColor="rgba(255,171,0,.2)" paginationActiveColor="rgba(255,171,0,1)" class="category-carousel-contain">
        <slide class="category-card">
          <router-link to="/categories/medical-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_medical">
            <div class="category-circle">
              <div class="category-sp category-sp--medical-fundraising"></div>
            </div>
            <div class="category-name" v-lang.medical>Medical</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/volunteer-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_volunteer">
            <div class="category-circle">
              <div class="category-sp category-sp--volunteer-fundraising"></div>
            </div>
            <div class="category-name" v-lang.volunteer>Volunteer</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/emergency-accident-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_emergencies">
            <div class="category-circle">
              <div class="category-sp category-sp--emergency-accident-fundraising"></div>
            </div>
            <div class="category-name" v-lang.emergencies>Emergencies</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/school-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_education">
            <div class="category-circle">
              <div class="category-sp category-sp--school-fundraising"></div>
            </div>
            <div class="category-name" v-lang.education>Education</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/funeral-memorial-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_memorials">
            <div class="category-circle">
              <div class="category-sp category-sp--funeral-memorial-fundraising"></div>
            </div>
            <div class="category-name" v-lang.memorial>Memorials</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/sports-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_sports">
            <div class="category-circle">
              <div class="category-sp category-sp--sports-fundraising"></div>
            </div>
            <div class="category-name" v-lang.sports>Sports</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/pet-animal-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_animals">
            <div class="category-circle">
              <div class="category-sp category-sp--pet-animal-fundraising"></div>
            </div>
            <div class="category-name" v-lang.animals>Animals</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/wishes-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_wishes">
            <div class="category-circle">
              <div class="category-sp category-sp--wishes-fundraising"></div>
            </div>
            <div class="category-name" v-lang.wishes>Wishes</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/competition-pageant-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_competitions">
            <div class="category-circle">
              <div class="category-sp category-sp--competition-pageant-fundraising"></div>
            </div>
            <div class="category-name" v-lang.competitions>Competitions</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/other-miscellaneous" class="category-contain" data-gfm-analytics-element="btn_cat_category_other">
            <div class="category-circle">
              <div class="category-sp category-sp--other-miscellaneous"></div>
            </div>
            <div class="category-name" v-lang.other>Other</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/wedding-honeymoon-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_newlyweds">
            <div class="category-circle">
              <div class="category-sp category-sp--wedding-honeymoon-fundraising"></div>
            </div>
            <div class="category-name" v-lang.newlyweds>Newlyweds</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/charity-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_charity">
            <div class="category-circle">
              <div class="category-sp subcategory-sp subcategory-sp--palm"></div>
            </div>
            <div class="category-name" v-lang.charity>Charity</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/church-religion-faith-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_faith">
            <div class="category-circle">
              <div class="category-sp category-sp--church-religion-faith-fundraising"></div>
            </div>
            <div class="category-name" v-lang.faith>Faith</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/travel-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_travel">
            <div class="category-circle">
              <div class="category-sp category-sp--travel-fundraising"></div>
            </div>
            <div class="category-name" v-lang.travel>Travel</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/creative-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_creative">
            <div class="category-circle">
              <div class="category-sp category-sp--creative-fundraising"></div>
            </div>
            <div class="category-name" v-lang.creative>Creative</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/community-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_community">
            <div class="category-circle">
              <div class="category-sp category-sp--community-fundraising"></div>
            </div>
            <div class="category-name" v-lang.community>Community</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/events-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_events">
            <div class="category-circle">
              <div class="category-sp category-sp--events-fundraising"></div>
            </div>
            <div class="category-name" v-lang.events>Events</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/business-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_business">
            <div class="category-circle">
              <div class="category-sp category-sp--business-fundraising"></div>
            </div>
            <div class="category-name" v-lang.business>Business</div>
          </router-link>
        </slide>
        <slide class="category-card">
          <router-link to="/categories/family-fundraising" class="category-contain" data-gfm-analytics-element="btn_cat_category_family">
            <div class="category-circle">
              <div class="category-sp category-sp--family-fundraising"></div>
            </div>
            <div class="category-name" v-lang.family>Family</div>
          </router-link>
        </slide>
      </carousel>
    </section>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
  name: "comp-campaign-types",
  components: {
    Carousel,
    Slide
  },
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">
#comp-campaign-types section{
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.25);
  background: #fff;
  padding: 20px;
}


</style>
