<template>
  <div class="">
    <div class="social-feed h-100 bg-bg">
      <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <nuxt-link
          to="/"
          class="navbar-brand p-0"
          style="font-size:30px"
          href="#"
        >
          <span class="color-main">Joo</span>ku
        </nuxt-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto" />
          <form class="form-inline my-2 my-lg-0">
            <div v-if="$auth.loggedIn">
              <div class="float-right  pull-right width-image-profile mr-3">
                <div
                  type="button"
                  class="dropdown-sm-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    v-lazy-load
                    width="100%"
                    class="rounded-circle"
                    :data-src="$auth.user.m_image"
                    :alt="$auth.user.name"
                  >
                </div>
                <div
                  class="dropdown-menu mr-3 dropdown-menu-right width-dropdown"
                >
                  <button class="dropdown-item pt-2 pb-2" type="button">
                    <img
                      v-lazy-load
                      width="15%"
                      class="rounded-circle"
                      :data-src="$auth.user.m_image"
                      :alt="$auth.user.name"
                    >
                    <span class="pl-2">Guest</span>
                  </button>
                  <hr class="p-0 m-2">
                  <button class="dropdown-item pt-2 pb-2" type="button">
                    <img
                      src="/avatar.png"
                      width="10%"
                      class="mr-2"
                      alt="profile setting"
                    >
                    <span>Settings Profile</span>
                  </button>
                  <button class="dropdown-item pt-2 pb-2" type="button">
                    <img
                      src="/playlist.png"
                      width="10%"
                      class="mr-2"
                      alt="profile setting"
                    >
                    <span>Create Playlist</span>
                  </button>
                  <hr class="p-0 m-2">
                  <nuxt-link
                    to="/auth/logout"
                    class="dropdown-item pt-2 pb-2"
                    type="button"
                  >
                    Log out
                  </nuxt-link>
                </div>
              </div>
              <div class="float-right mr-3">
                <div
                  type="button"
                  class="dropdown-sm-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="far fa-bell fa-2x p-1" />
                </div>
                <div
                  class="dropdown-menu mr-3 dropdown-menu-right width-notification"
                >
                  <button class="dropdown-item pt-2 pb-2" type="button">
                    sad
                  </button>
                </div>
              </div>
            </div>
            <div v-else>
              Have an account?
              <nuxt-link class="pl-1 color-main pr-1" to="/auth/login">
                Sign in
              </nuxt-link>
              or
              <nuxt-link class="pl-1 color-main" to="/auth/register">
                Create an Account
              </nuxt-link>
            </div>
          </form>
        </div>
      </nav>
      <br><br>
      <div class="row">
        <div v-if="$device.isDesktop" class="col-md-3 d-none d-lg-block">
          <div class="bg-left">
            <div class="pl-3 pr-3 pt-5">
              <nuxt-link to="/">
                <div class="cover-left mt-4">
                  <img
                    v-lazy-load
                    class="rounded"
                    data-src="~assets/images/covermakememe.jpg"
                    width="100%"
                    height="85"
                    alt=""
                  >
                  <div class="text-cover">
                    <h3>Make a Meme</h3>
                  </div>
                </div>
              </nuxt-link>
            </div>
            <br>
            <ul class="menu-left">
              <li class="menu-active">
                <nuxt-link class="link-menu color-dark" to="/">
                  <i class="fas fa-meteor mr-2 color-main" /> My Feed
                </nuxt-link>
              </li>
              <li class="li-menu">
                <nuxt-link class="link-menu" to="/">
                  <i class="fas fa-random mr-2" /> Random Memes
                </nuxt-link>
              </li>
              <li class="li-menu">
                <nuxt-link class="link-menu" to="/">
                  <i class="fas fa-heart mr-2" /> My Subscribe
                </nuxt-link>
              </li>
              <li class="li-menu">
                <nuxt-link class="link-menu" to="/">
                  <i class="fas mr-2 fa-bell" /> Notification
                </nuxt-link>
              </li>
              <li class="li-menu">
                <nuxt-link class="link-menu" to="/">
                  <i class="fas fa-play-circle mr-2" /> Playlist
                </nuxt-link>
              </li>
            </ul>
            <div class="bottom-menu-left">
              <ul class="menu-left">
                <li class="li-menu">
                  <nuxt-link class="link-menu" to="/">
                    <i class="fas fa-cog mr-2" /> Settings & Privacy
                  </nuxt-link>
                </li>
                <li class="li-menu">
                  <nuxt-link class="link-menu" to="/">
                    <i class="fas fa-question-circle mr-2" /> Help & Support
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
            <div class="bg-white rounded">
              <div class="pl-2 pt-3 border-bottom">
                <h4>Trends for you</h4>
              </div>
              <nuxt-link v-for="(h,index) in hashtag" :key="index" to="" class="text-decoration-none text-dark">
                <div class="p-3  border-bottom">
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
export default {
  name: 'Index',
  scrollToTop: true,
  components: {
    card
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
  background: #00a8e8;
  color: white;
}
.pl-8 {
  padding-left: 8%;
}
.body {
  display: table;
}
.bg-left {
  height: 100%;
  width: 260px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  padding-top: 20px;
}
.text-cover {
  position: absolute;
  top: 30%;
  left: 12%;
  color: white;
}
.cover-left {
  display: block;
  width: 100%;
  position: relative;
}
.menu-left {
  list-style-type: none;
  padding: 0px;
}
.li-menu {
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  width: 100%;
  font-size: 19px;
  padding-left: 9%;
}
.menu-active {
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  width: 100%;
  font-size: 19px;
  padding-left: 8%;
  border-left: 3px solid #00a8e8;
  /* background: rgba(255, 107, 107,0.2); */
}
.link-menu {
  text-decoration: none;
  color: #a6a6a6;
}
.link-menu:hover {
  text-decoration: none;
  color: #00a8e8;
}

.bottom-menu-left {
  position: absolute;
  bottom: 0px;
  width: 280px;
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
.main-stream {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
}
.width-image-profile {
  width: 35px;
}
.width-dropdown {
  width: 20%;
}
.width-notification {
  width: 30%;
}
.width-dropdown-card {
  width: 15% !important;
}
.btn-newpost {
  background: #00a8e8;
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
