<template>
  <div class="">
    <div class="social-feed h-100 bg-bg">
      <navbar />
      <br><br>
      <div class="row">
        <leftmenu />
        <div class="col-md-6 main-stream bg-bg">
          <div class="main">
            <h1 class="float-left pt-2">
              Main Stream
            </h1>
            <div class="clearfix" />
          </div>
          <div class="row">
            <!-- card -->
            <card />
            <br><br>
          </div>
          <br>
        </div>
        <div v-if="$device.isDesktop" class="col-md-3 d-none d-lg-block pr-3 bg-bg ">
          <br>
          <br>
          <div class="pr-4">
            <h4>Trends for you</h4>
            <div class="bg-white rounded">
              <!-- <div class="pl-2 pt-3 border-bottom">
                <h4>Trends for you</h4>
              </div> -->
              <nuxt-link v-for="(h,index) in hashtag" :key="index" to="" class="text-decoration-none text-dark">
                <div class="pl-3 pr-3 pt-2 pb-2 border-bottom">
                  <div class="color-main">
                    {{ h.h_name }}
                  </div>
                  <span>{{ h.h_count+1 }} Hashtags</span>
                </div>
              </nuxt-link>
              <nuxt-link to="" class="color-main text-decoration-none">
                <div class="p-3">
                  Show More
                </div>
              </nuxt-link>
            </div>
            <br>
          </div>
          <div class="pr-4 sticky-top ">
            <div class="bg-white rounded">
              <div class="pl-2 pt-3 border-bottom">
                <h4>Best Playlist</h4>
              </div>
              <nuxt-link to="" class="text-decoration-none text-dark">
                <div class="p-3  border-bottom">
                  <div class="color-main">
                    #555
                  </div>
                  <span>21K Hashtags</span>
                </div>
              </nuxt-link>
            </div>
            <div class="text-muted mt-2 p-2">
              <nuxt-link to="" class="text-muted">
                Term
              </nuxt-link>
              <nuxt-link to="" class="text-muted">
                Privacy Policy
              </nuxt-link>
              <nuxt-link to="" class="text-muted">
                DMCA
              </nuxt-link>
              <br>
              © 2020 Jooku, Inc.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '~/components/index/card'
import leftmenu from '~/components/leftmenu'
import navbar from '~/components/navbar'
export default {
  name: 'Index',
  scrollToTop: true,
  components: {
    card, leftmenu, navbar
  },
  data () {
    return {

      hashtag: []
    }
  },
  async mounted () {
    // eslint-disable-next-line no-undef
    $(function () {
      // eslint-disable-next-line no-undef
      $('[data-toggle="tooltip"]').tooltip()
    })
    const datahash = await this.$axios.get('/main/hashtag')
    this.hashtag = datahash.data
  },
  methods: {
    noting () {

    }

    // storeToken () {
    //   if (process.browser) {
    //     localStorage.setItem('authToken', '5555')
    //   }
    // }
  },
  head () {
    return {
      title: 'Jooku'
    }
  }
}
</script>

<style scoped>
.btn-green {
  background: #06d6a0;
  color:white;
}
.btn-red {
  background: #ef476f;
  color:white;
}
.btn-blue {
  background: #ef476f;
  color:white;
}
.pointer {
  padding-top:2px;
  cursor: pointer;
}
.pointer:hover {
  border-radius: 4px;
  background:#3c424b;
  color:white;
  cursor: pointer;
}

.pointeronly {
  cursor: pointer;
}
.border-bottom {
  border-bottom: 1px solid #ddd;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.font-image{
  font-size: 23px;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
.bg-white {
  background: white;
  border-bottom: 1px solid #dddd;
}
.rowmain {
  column-width: 18em;
  -moz-column-width: 18em;
  -webkit-column-width: 18em;
  column-gap: 1em;
  -moz-column-gap: 1em;
  -webkit-column-gap: 1em;
}
.dropsize {
  font-size: 20px;
}
.item {
  display: inline-block;
  padding: 0.25rem;
  width: 100%;
}

.well {
  position: relative;
  display: block;
}
.border-right {
  border-right: 2px solid #dddd;
}
.color-muted {
  color: #dddd;
}
.mt-haha {
  margin-top: 4%;
  margin-right: 10%;
}
.action-detail {
  border: 1px solid #dddd;
  border-radius: 20px;
  padding: 5px 25px;
}
.btn-follow {
  border: 0px;
  background: #8338ec;
  color: white;
}
.pl-8 {
  padding-left: 8%;
}

.auth {
  background: white;
  color: #212121;
}
.play-listmeme {
  color: white;
  height: 200px;
}
.img-rounded {
  border-radius: 0.25rem 0px 0px 0.25rem !important;
}
.feed-card {
  background: white;
}
.bg-bg {
  background: #f8f8f8 !important;
}
html,body {
  background: #f8f8f8 !important;
}
.main-stream {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
}

.btn-newpost {
  background: #8338ec;
  color: white;
}
.img-radius {
  border-radius: 6px 6px 0 0;
  /* filter: brightness(80%); */
}

@media only screen and (max-width: 600px) {
  .main-stream {
    padding-left: 10%;
    padding-right: 7%;
  }
}
</style>
