<template>
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
</template>
<script>
export default {
  name: 'LeftMenu'
}
</script>

<style scoped>
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
  border-left: 3px solid #615dfa;
  /* background: rgba(255, 107, 107,0.2); */
}
.link-menu {
  text-decoration: none;
  color: #a6a6a6;
}
.link-menu:hover {
  text-decoration: none;
  color: #615dfa;
}
.bottom-menu-left {
  position: absolute;
  bottom: 0px;
  width: 280px;
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
</style>
