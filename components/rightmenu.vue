<template>
  <div
    v-if="$device.isDesktop"
    class="pl-0 col-md-3 d-none d-lg-block pr-4 pt-1"
  >
    <br>
    <br>
    <div class="pr-4">
      <div class="bg-white rounded p-3 mb-3 shadow-sm">
        <h5 class="pt-2">
          Best Playlists
        </h5>
        <div class="row pl-2 pr-2 pt-2">
          <div class="col-md-6 p-1">
            <nuxt-link to="" class="memeplaylist">
              <img
                v-lazy-load
                class="rounded imgPlaylist"
                data-src="https://pbs.twimg.com/profile_images/1168928962917097472/gD5uWGj3_400x400.jpg"
                width="100%"
                height="200px"
                alt=""
              >
              <div class="btnplay">
                <i class="fas fa-play color-white fa-2x" />
              </div>
              <div class="memecount">
                25 Memes
              </div>
            </nuxt-link>
          </div>
          <div class="col-md-6 p-1">
            <nuxt-link to="" class="memeplaylist">
              <img
                v-lazy-load
                class="rounded imgPlaylist"
                data-src="https://pbs.twimg.com/profile_images/1145982270022410241/ebWHeZJo_400x400.jpg"
                width="100%"
                height="200px"
                alt=""
              >
              <div class="btnplay">
                <i class="fas fa-play color-white fa-2x" />
              </div>
              <div class="memecount">
                25 Memes
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="bg-white rounded p-3 mb-3 shadow-sm">
        <div class="pl-1 pt-3">
          <h5>Trends for you</h5>
        </div>
        <nuxt-link
          v-for="(h, index) in hashtag"
          :key="index"
          to=""
          class="text-decoration-none text-dark"
        >
          <div class="pl-1 pr-3 pt-2 pb-2">
            <div class="color-main">
              {{ h.h_name }}
            </div>
            <span>{{ h.h_count + 1 }} posts</span>
          </div>
        </nuxt-link>
        <nuxt-link to="" class="color-main text-decoration-none float-right">
          <div class="p-2">
            Show More
          </div>
        </nuxt-link>
        <div class="clearfix" />
      </div>
      <br>
    </div>
    <div class="pr-4 sticky-top ">
      <div class="bg-white rounded">
        <div class="pl-2 pt-3">
          <h4>Best Playlist</h4>
        </div>
        <nuxt-link to="" class="text-decoration-none text-dark">
          <div class="p-3 ">
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
</template>

<script>
export default {
  name: 'RightMenu',
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
  }
}
</script>

<style scoped>
.memecount {
  position: absolute;
  bottom: 2%;
  left: 10%;
  font-size: 12px;
  color: white;
  opacity: 0;
  transition: 0.2s;
}
.imgPlaylist {
  background: black;
  z-index: 1;
  object-fit: contain;
  filter: brightness(50%);
}
.memeplaylist:hover .memecount {
  opacity: 1;
}

.btnplay {
  position: absolute;
  top: 40%;
  left: 40%;
}
</style>
