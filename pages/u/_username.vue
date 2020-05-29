<template>
  <div>
    <navbar />
    <div class="row">
      <leftmenu />
      <div class="col-md-9 pl-md-0 mt-4 pr-md-5">
        <br>
        <br>
        <br>
        <div class="pl-2 pr-1 ml-1 pl-md-0 pr-md-0 ml-md-0">
          <div class="bg-white shadow-sm rounded">
            <img
              v-lazy-load
              :data-src="user.m_cover"
              class="cover"
              height="250"
              width="100%"
              alt=""
            >
            <div class="righttopmenu">
              .
            </div>
            <div class="pl-5 pr-5 pt-5 pb-3">
              <div class="row">
                <div
                  class="col-md-4 order-md-0 order-1 pl-0 pr-0 col-12 text-center"
                >
                  <div class="row">
                    <div class="col-md-4 col-4">
                      <div class="border-right" />
                      <h4>930</h4>
                      <div class="postleft">
                        POSTS
                      </div>
                    </div>
                    <div class="col-md-4 col-4">
                      <div class="border-right" />
                      <h4>1,504</h4>
                      <div class="postleft">
                        FOLLOWERS
                      </div>
                    </div>
                    <div class="col-md-4 col-4">
                      <h4>15</h4>
                      <div class="postleft">
                        FOLLOWING
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-12 order-md-0 order-0">
                  <svg viewBox="0 0 36 36" class="circular-chart-2 profile">
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
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stop-color="#00bbf9" />
                            <stop offset="100%" stop-color="#635dff" />
                          </linearGradient>
                          <pattern
                            :id="`img_profile_${user.m_id}`"
                            x="0%"
                            y="0%"
                            height="100%"
                            width="100%"
                            viewBox="0 0 40 40"
                          >
                            <image
                              :xlink:href="user.m_image"
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
                          :fill="`url(#img_profile_${user.m_id})`"
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
                        >
                          5
                        </text>
                      </svg>
                    </g>
                  </svg>
                  <h4 class="text-center text-capitalize h4 text-truncate">
                    {{ user.m_name.toUpperCase() }}
                  </h4>
                  <div class="text-center postleft text-capitalize">
                    @{{ user.m_username.toUpperCase() }}
                  </div>
                </div>
                <div class="col-md-4 pl-0 pr-0 col-12 order-2 order-md-0">
                  <div class="float-md-right text-center mt-2 mt-md-0">
                    <button class="btn bg-primary color-white">
                      <i class="fab fa-facebook-square" />
                    </button>
                    <button class="btn bg-orange color-white">
                      <i class="fab fa-patreon" />
                    </button>
                    <span class="border-right ml-1 mr-2 position-static" />
                    <button class="btn bg-warning color-white">
                      <i class="fas fa-flag" />
                    </button>
                    <button
                      v-if="user.m_id != $auth.user.m_id"
                      class="btn bg-main-2 color-white"
                    >
                      Follow
                    </button>
                    <button v-else class="btn bg-main-2 color-white">
                      Set up profile
                    </button>
                  </div>
                  <div class="clearfix" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 order-2 order-md-1 pl-md-2 pl-4 mt-2">
            <card :userid="user.m_id" class="only-padding-card" />
          </div>
          <div
            class="col-md-4 order-1 order-md-2 pl-4 mt-2 pl-md-0 padding-right-only"
            style="padding-top:0.4%"
          >
            <div class="bg-white rounded p-3 mb-3 shadow-sm">
              <h5 class="pt-2">
                About me
              </h5>
              <div class="pt-2">
                crazy person
              </div>
            </div>
            <div class="bg-white rounded p-3 mb-3 shadow-sm">
              <h5 class="pt-2">
                Leave a comment
              </h5>
              <div class="pt-2">
                <leavecomment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import navbar from '~/components/navbar'
import leftmenu from '~/components/leftmenu'
import card from '~/components/index/card'
// import profile from '~/components/user/profile'
import leavecomment from '~/components/user/leavecomment'
export default {
  name: 'Profile',
  components: {
    navbar,
    leftmenu,
    card,
    leavecomment
  },
  async asyncData ({ params, $axios, req }) {
    const url = req
      ? 'https://' + req.headers.host + '/u/' + params.username
      : ''
    const data = await $axios.$get(`/profile/${params.username}`)
    return { user: data[0], url }
  },
  head () {
    return {
      title: ` ${this.user.m_name[0].toUpperCase()}${this.user.m_name.slice(
        1,
        this.user.m_name.length
      )} - Jooku`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: `jooku profile ${this.user.m_name} meme gif`
        },
        { property: 'og:title', content: this.user.m_name },
        { property: 'og:site_name', content: 'Jooku' },
        // The list of types is available here: http://ogp.me/#types
        { property: 'og:type', content: 'video.episode' },
        // Should the the same as your canonical link, see below.
        {
          property: 'og:url',
          content: this.url
        },
        {
          property: 'og:image',
          content: this.user.m_image
        },
        // Often the same as your meta description, but not always.
        {
          property: 'og:description',
          content: `jooku profile ${this.user.m_name} meme gif`
        },

        // Twitter card
        { name: 'twitter:card', content: 'summary' },
        {
          name: 'twitter:site',
          content: this.url
        },
        { name: 'twitter:title', content: this.user.m_name },
        {
          name: 'twitter:description',
          content: `jooku profile ${this.user.m_name} meme gif`
        },
        // Your twitter handle, if you have one.
        { name: 'twitter:creator', content: '@alligatorio' },
        {
          name: 'twitter:image:src',
          content: this.user.m_image
        },
        {
          name: 'twitter:image',
          content: this.user.m_image
        },

        // Google / Schema.org markup:
        { itemprop: 'name', content: this.user.name },
        {
          itemprop: 'description',
          content: `jooku profile ${this.user.name} meme gif`
        },
        {
          itemprop: 'image',
          content: this.user.image
        }
      ],
      link: [{ rel: 'canonical', href: this.url }],
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    }
  }
}
</script>

<style scoped>
.righttopmenu {
  position: absolute;
  top: 5%;
  right: 8%;
}
.cover {
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 4px 4px 0px 0px;
}
.profile {
  bottom: 135%;
  left: 25%;
}
.only-padding-card {
  padding-left: 3px;
}
@media only screen and (max-width: 768px) {
  .padding-right-only{
    margin-top:15px !important;
    padding-left: 28px !important;
    padding-right: 20px !important;
    margin-bottom: -10px !important;
  }
  .only-padding-card {
    padding-left: 0px;
  }
  .profile {
    bottom: 135%;
    left: 25%;
  }
}

.postleft {
  color: #212121;
  opacity: 0.7;
  font-size: 13px;
}
.border-right {
  border-right: 10px solid #212121;
  opacity: 0.7;
  height: 30px !important;
  margin: auto;
  position: absolute;
  right: 0px;
  top: 15%;
}
</style>
