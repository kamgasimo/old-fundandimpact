<template>
<div id="scripture">
  <div class="event media sm-maxwidth400 p-5 mt-0 mb-5">
    <div class="row">
      <div class="col-xs-12 p-0 pl-10">
        <div class="event-content p-5">
          <h5 class="media-heading text-uppercase"><a href="javascipt:(void)">{{scripture.title}}</a></h5>
          <p class="mb-30">{{scripture.message}}</p>
          <ul>
            <li><i class="fa fa-book"></i> {{scripture.reference}}</li>
            <li v-if="scripture.likes"><a><i class="pe-7s-like2"></i> {{scripture.likes.length}}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "scripture",
  props: ['scripture'],
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">
</style>
