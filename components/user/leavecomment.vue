<template>
  <div class="">
    <div class="name mb-2">
      <div class="row">
        <div class="col-md-3 col-3">
          <nuxt-link
            :to="`/u/${$auth.user.m_username}`"
            class="position:relative"
          >
            <svg viewBox="0 0 36 36" class="circular-chart">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#00bbf9" />
                  <stop offset="100%" stop-color="#8338ec" />
                </linearGradient>
                <pattern
                  :id="`img_${i}`"
                  x="0%"
                  y="0%"
                  height="100%"
                  width="100%"
                  viewBox="0 0 36 36"
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
                stroke-dasharray="75, 100"
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
                :fill="`url(#img_${i})`"
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
          </nuxt-link>
        </div>
        <div class="col-md-9 col-9 pl-0">
          <span
            class="lend"
          ><strong><nuxt-link
            class="text-decoration-none text-dark text-capitalize"
            :to="`/u/${$auth.user.m_username}`"
          >{{ $auth.user.m_name }}</nuxt-link></strong></span>
          <br>
          <span
            class="text-muted"
          >@{{ $auth.user.m_username }}
          </span>
        </div>
      </div>
      <div class="content mt-3">
        das
        <div class="momentdate color-dark-2 mt-1">
          3 day ago
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileLeaveComments'
}
</script>

<style scoped>
.momentdate {
    font-size:14px
}
</style>
