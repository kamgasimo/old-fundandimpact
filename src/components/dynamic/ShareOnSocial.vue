<template>
  <div id="share-on-social">
    <social-sharing v-if="url" :url="url" inline-template>
      <div id="social-shares" class="styled-icons icon-dark">
        <network network="facebook">
          <a data-toggle="tooltip" data-placement="top" title="facebook" data-bg-color="#3B5998">
              <i class="fa fa-facebook"></i>
            </a>
        </network>
        <network network="googleplus">
          <a data-toggle="tooltip" data-placement="top" title="googleplus" data-bg-color="#D71619">
              <i class="fa fa-google-plus"></i>
            </a>
        </network>
        <network network="linkedin">
          <a data-toggle="tooltip" data-placement="top" title="linkedin" data-bg-color="#007BB6">
              <i class="fa fa-linkedin"></i>
            </a>
        </network>
        <network network="pinterest">
          <a data-toggle="tooltip" data-placement="top" title="pinterest" data-bg-color="#D63633">
              <i class="fa fa-pinterest"></i>
            </a>
        </network>
        <network network="reddit">
          <a data-toggle="tooltip" data-placement="top" title="reddit" data-bg-color="#6CC0FF">
              <i class="fa fa-reddit"></i>
            </a>
        </network>
        <network network="twitter">
          <a data-toggle="tooltip" data-placement="top" title="twitter" data-bg-color="#02B0E8">
              <i class="fa fa-twitter"></i>
            </a>
        </network>
        <network network="vk">
          <a data-toggle="tooltip" data-placement="top" title="VKontakte" data-bg-color="#4C75A3">
              <i class="fa fa-vk"></i>
            </a>
        </network>
        <network network="weibo">
          <a data-toggle="tooltip" data-placement="top" title="weibo" data-bg-color="#BD3F40">
              <i class="fa fa-weibo"></i>
            </a>
        </network>
        <network network="whatsapp">
          <a data-toggle="tooltip" data-placement="top" title="whatsapp" data-bg-color="#109D58">
              <i class="fa fa-whatsapp"></i>
            </a>
        </network>
      </div>
    </social-sharing>

    <social-sharing v-else inline-template>
      <div id="social-shares" class="styled-icons icon-dark">
        <network network="facebook">
          <a data-toggle="tooltip" data-placement="top" title="facebook" data-bg-color="#3B5998">
              <i class="fa fa-facebook"></i>
            </a>
        </network>
        <network network="googleplus">
          <a data-toggle="tooltip" data-placement="top" title="googleplus" data-bg-color="#D71619">
              <i class="fa fa-google-plus"></i>
            </a>
        </network>
        <network network="linkedin">
          <a data-toggle="tooltip" data-placement="top" title="linkedin" data-bg-color="#007BB6">
              <i class="fa fa-linkedin"></i>
            </a>
        </network>
        <network network="pinterest">
          <a data-toggle="tooltip" data-placement="top" title="pinterest" data-bg-color="#D63633">
              <i class="fa fa-pinterest"></i>
            </a>
        </network>
        <network network="reddit">
          <a data-toggle="tooltip" data-placement="top" title="reddit" data-bg-color="#6CC0FF">
              <i class="fa fa-reddit"></i>
            </a>
        </network>
        <network network="twitter">
          <a data-toggle="tooltip" data-placement="top" title="twitter" data-bg-color="#02B0E8">
              <i class="fa fa-twitter"></i>
            </a>
        </network>
        <network network="vk">
          <a data-toggle="tooltip" data-placement="top" title="VKontakte" data-bg-color="#4C75A3">
              <i class="fa fa-vk"></i>
            </a>
        </network>
        <network network="weibo">
          <a data-toggle="tooltip" data-placement="top" title="weibo" data-bg-color="#BD3F40">
              <i class="fa fa-weibo"></i>
            </a>
        </network>
        <network network="whatsapp">
          <a data-toggle="tooltip" data-placement="top" title="whatsapp" data-bg-color="#109D58">
              <i class="fa fa-whatsapp"></i>
            </a>
        </network>
      </div>
    </social-sharing>
  </div>
</template>
<script>
export default {
  name: "share-on-social",
  props: ['url'],
  data: function data() {
    return {

    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    window.THEMEMASCOT.initialize.TM_customDataAttributes();
  }
}
</script>
<style lang="css">
</style>
