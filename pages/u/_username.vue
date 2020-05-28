<template>
  <div>
    <navbar />
    <div class="row">
      <leftmenu />
      <div class="col-md-9 pr-md-5 pl-md-0 pl-4 mt-3">
        <br>
        <br>
        <br>
        <div class="bg-white shadow-sm rounded">
          <img
            v-lazy-load
            :data-src="user.m_cover"
            class="cover"
            height="250"
            width="100%"
            alt=""
          >
          <div class="pl-5 pr-5 pt-5 pb-3">
            <div class="row">
              <div class="col-md-4 pl-0 pr-0 col-4 text-center">
                <div class="row">
                  <div class="col-md-4">
                    <div class="border-right" />
                    <h4>930</h4>
                    <div class="postleft">
                      POSTS
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="border-right" />
                    <h4>1,504</h4>
                    <div class="postleft">
                      FOLLOWERS
                    </div>
                  </div>
                  <div class="col-md-4">
                    <h4>15</h4>
                    <div class="postleft">
                      FOLLOWING
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-5">
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
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                      >5</text>

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
            </div>
          </div>
        </div>
        <div class="col-md-9 pr-md-5 pl-md-0 pl-4 mt-2" style="margin-left:-5px">
          <card :userid="user.m_id" />
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
export default {
  name: 'Profile',
  components: {
    navbar, leftmenu, card
  },
  async asyncData ({ params, $axios }) {
    const data = await $axios.$get(`/profile/${params.username}`)
    return { user: data[0] }
  }
}
</script>

<style  scoped>
.cover {
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 4px 4px 0px 0px;
}
.profile{
  bottom:135%;
  left: 25%;
}
.postleft{
  color:#212121;
  opacity:0.7;
  font-size: 13px;
}
.border-right {
  border-right: 10px solid #212121;
  opacity:0.7;
  height: 30px !important;
  margin:auto;
  position:absolute;
  right:0px;
  top:15%;
}
</style>
