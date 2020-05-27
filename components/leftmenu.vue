<template>
  <div v-if="$device.isDesktop" class="col-md-3 d-none d-lg-block">
    <div class="bg-left">
      <div v-if="$auth.loggedIn" class="position-relative">
        <img src="https://i.pinimg.com/originals/bd/42/77/bd427729187cc5fd7830430d9749e345.gif" style="z-index:-1;object-fit: cover;" width="100%" height="110px" alt="">
        <svg viewBox="0 0 36 36" class="circular-chart profile">
          <circle
            cx="18"
            cy="18"
            r="18"
            width="100%"
            height="100%"
            fill="white"
          />
          <g>
            <svg viewBox="-2 -2 40 40">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#00bbf9" />
                  <stop offset="100%" stop-color="#635dff" />
                </linearGradient>
                <pattern
                  :id="`img_auth`"
                  x="0%"
                  y="0%"
                  height="100%"
                  width="100%"
                  viewBox="0 0 40 40"
                >
                  <image
                    :xlink:href="$auth.user.m_image"
                    width="100%"
                    height="100%"
                  />
                </pattern>
              </defs>

              <path
                stroke="#ddd"
                class="circle2"
                stroke-dasharray="100, 100"
                d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke="url(#gradient)"
                class="circle"
                stroke-dasharray="30, 100"
                d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <circle
                cx="18"
                cy="18"
                r="13"
                width="100%"
                height="100%"
                :fill="`url(#img_auth)`"
              />
              <circle
                cx="29"
                cy="29"
                r="6.5"
                stroke="white"
                stroke-width="1.5"
                width="100%"
                height="100%"
                fill="#212121"
              />
              <text
                x="29"
                y="29"
                fill="white"
                font-size="8"
                text-anchor="middle"
                dy=".3em"
              >5</text>

            </svg>
          </g>
        </svg>
      </div>
      <br>
      <br>
      <div v-if="$auth.loggedIn">
        <div class="text-center mt-1 text-capitalize">
          <h5>
            {{ $auth.user.m_name }}
          </h5>
          <div class="color-dark-2 font-smaill">
            @{{ $auth.user.m_username }}
          </div>
        </div>
      </div>

      <!-- <div class="pl-3 pr-3 pt-5">
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
      </div> -->
      <br>
      <ul class="menu-left">
        <nuxt-link class="link-menu color-white" to="/">
          <li class="menu-active mb-1">
            <i class="fas fa-meteor mr-2" /> Feed
          </li>
        </nuxt-link>
        <nuxt-link class="link-menu" to="/">
          <li class="li-menu">
            <i class="fas fa-random mr-2" /> Random
          </li>
        </nuxt-link>
        <nuxt-link class="link-menu" to="/">
          <li class="li-menu">
            <i class="fas fa-heart mr-2" /> Subscribe
          </li>
        </nuxt-link>
        <nuxt-link class="link-menu" to="/">
          <li class="li-menu">
            <i class="fas mr-2 fa-bell" /> Notification
          </li>
        </nuxt-link>
        <nuxt-link class="link-menu" to="/">
          <li class="li-menu">
            <i class="fas fa-play-circle mr-2" /> Playlist
          </li>
        </nuxt-link>
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
.font-smaill{
  font-size: 13px;
  margin-top: -5px;
}
.circle{
  border-radius: 100%;
}
.profile {
  /* position:absolute; */
  /* border: 10px solid white; */
  width: 37%;
  top:60%;
  left:30%;
  padding:1%
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
  padding-top: 3.5%;
  padding-bottom: 3.5%;
  width: 100%;
  font-size: 16px;
  padding-left: 9%;
}

.menu-active {
  border-radius:5px;
  padding-top: 3.5%;
  padding-bottom: 3.5%;
  width: 87%;
  font-size: 16px;
  padding-left: 4%;
  /* border-left: 3px solid #635dff; */
  background: #ff006e;
  color:white !important;
  margin-left: 5%;
}
.link-menu {
  text-decoration: none;
  color: #a6a6a6;
}
.link-menu:hover {
  text-decoration: none;
  color: #635dff;
  width: 90%;
  background:white;
  box-shadow:0 .125rem .25rem rgba(0,0,0,.075)!important
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
