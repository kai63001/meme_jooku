<template>
  <div class="">
    <div v-for="(meme,i) in memeData" :key="i" class="col-md-12 item">
      <div class="card-feed bg-white shadow-sm rounded">
        <div class="p-3">
          <div class="name float-left w-80" style="width:80%">
            <div class="row">
              <div class="col-md-2 col-3">
                <img
                  v-lazy-load
                  :data-src="meme.m_image"
                  class="rounded-circle image-avatar"
                  width="100%"
                  alt=""
                >
              </div>
              <div class="col-md-10 col-9 pl-0">
                <span
                  class="lend"
                ><strong>{{ meme.m_name }}</strong></span>
                <br>
                <span class="text-muted">{{ $moment(parseInt(meme.p_date)) }} ·</span>
                <nuxt-link
                  to=""
                  class="text-decoration-none color-main"
                >
                  Follow
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="float-right">
            <div v-if="$auth.loggedIn" class="dropdown">
              <div class="" data-toggle="dropdown">
                <i class="fas fa-ellipsis-h pointeronly" />
              </div>
              <div v-if="meme.m_id == $auth.user.m_id" class="dropdown-menu dropdown-menu-tip-n dropdown-menu-right">
                <button class="dropdown-item">
                  <i class="far fa-plus-square mr-2" /> Playlist
                </button>
                <hr class="p-0 m-2">
                <button class="dropdown-item">
                  <i class="far fa-trash-alt mr-2" /> Delete
                </button>
              </div>
              <div v-else class="dropdown-menu dropdown-menu-tip-n dropdown-menu-right">
                <a href="#" class="dropdown-item"><i class="far fa-plus-square mr-2" /> Playlist</a>
                <a href="#" class="dropdown-item"><i class="far fa-flag mr-2" /> Report</a>
              </div>
            </div>
          </div>
          <div class="clearfix" />
        </div>
        <div class="content-meme pl-4 pr-4 pb-3">
          <div v-if="meme.p_detail.length > 0">
            <span style="white-space: pre-line;">{{ meme.p_detail }}</span>
          </div>
          <div v-if="meme.p_hashtag.length > 0">
            <nuxt-link v-for="(hashtagH,index) in meme.p_hashtag.split(',')" :key="index" class="color-main" to="">
              {{ `#${hashtagH}` }}
            </nuxt-link>
          </div>
        </div>
        <img
          v-if="meme.p_image != ''"
          v-lazy-load
          width="100%"
          :data-src="meme.p_image"
          :alt="meme.p_detail + ' ID '+ meme.p_id"
        >
        <div class="p-3">
          <div class="row">
            <div v-if="$auth.loggedIn" class="col-md-4 col-4">
              <div v-show="meme.liked != null && meme.liked.includes($auth.user.m_id)" class="text-center pt-2 pb-2 pointer color-main" @click="unlike(meme.p_id,i)">
                <i class="fas fa-laugh-squint " style="font-size:17px;" />
                <span style="matgin-top:-12px">{{ meme.likes }}</span>
              </div>
              <div v-show="meme.liked == null || !meme.liked.includes($auth.user.m_id)" class="text-center pt-2 pb-2 pointer" @click="like(meme.p_id,i)">
                <i class="far fa-laugh-squint" style="font-size:17px" />
                <span style="matgin-top:-12px">{{ meme.likes }}</span>
              </div>
            </div>
            <div v-else class="col-md-4 col-4">
              <nuxt-link to="/auth/login" class="pointer text-decoration-none color-dark">
                <div class="text-center pt-2 pb-2 pointer">
                  <i class="far fa-laugh-squint" style="font-size:17px" />
                  <span style="matgin-top:-12px">{{ meme.likes }}</span>
                </div>
              </nuxt-link>
            </div>
            <div class="col-md-4 col-4">
              <div class="text-center pt-2 pb-2 pointer" @click="commentShow(i)">
                <i class="far fa-comments" />
                <span style="matgin-top:-12px">{{ meme.comments }}</span>
              </div>
            </div>
            <div class="col-md-4 col-4">
              <div class="text-center pt-2 pb-2 pointer">
                <i class="far fa-share-square" />
                <span style="matgin-top:-12px" />
              </div>
            </div>
          </div>
          <comments v-if="meme.commentsShow == 1" :msg="meme.p_id" :index="i" @onCommentPost="onCommentPost" />
        </div>
      </div>
    </div>
    <client-only>
      <infinite-loading ref="InfiniteLoading" class="w-100" @infinite="loadMoreTours">
        <div slot="spinner" class="w-100">
          <div class="row p-1">
            <div class="col-md-12">
              <div class="bg-white shadow-sm text-center w-100 p-3">
                <i class="fas fa-circle-notch fa-spin" />
              </div>
            </div>
          </div>
        </div>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import comments from '~/components/comments'

export default {
  name: 'Card',
  components: {
    comments
  },
  data () {
    return {
      memeData: [],
      page: 1
    }
  },
  mounted () {
    this.loadMoreTours()
    // eslint-disable-next-line no-undef
    $(function () {
      // eslint-disable-next-line no-undef
      $('[data-toggle="tooltip"]').tooltip()
    })
  },
  methods: {
    onCommentPost (i) {
      console.log(i)
      this.$set(this.memeData[i], 'comments', (this.memeData[i].comments || 0) + 1)
    },
    async unlike (id, index) {
      // eslint-disable-next-line camelcase
      let liked = this.memeData[index].liked
      console.log('liked :' + liked)
      // eslint-disable-next-line camelcase
      const index_dele = liked.indexOf(this.$auth.user.m_id)
      // eslint-disable-next-line camelcase
      console.log('index_dele :' + index_dele)
      // eslint-disable-next-line camelcase
      if (index_dele > -1) {
        if (liked.includes(',')) {
          liked = liked.split(',')
          liked.splice(index_dele, 1)
        } else {
          liked = ''
        }
        console.log(liked)
        this.$set(this.memeData[index], 'likes', (this.memeData[index].likes || 0) - 1)
        this.$set(this.memeData[index], 'liked', liked)
      }
      await this.$axios.delete(`/unlike/${id}`).then((res) => {
        console.log(res.data)
      }).catch((e) => { console.log(e) })
    },
    commentShow (index) {
      this.$set(this.memeData[index], 'commentsShow', !this.memeData[index].commentsShow)
    },
    async like (id, index) {
      this.$set(this.memeData[index], 'likes', (this.memeData[index].likes || 0) + 1)
      if (this.memeData[index].liked == null) {
        this.$set(this.memeData[index], 'liked', [this.$auth.user.m_id])
      } else {
        this.$set(this.memeData[index], 'liked', this.memeData[index].liked + ',' + this.$auth.user.m_id)
        // this.memeData[index].liked.push(this.$auth.user.m_id)
      }
      await this.$axios.get(`/like/${id}`).then((res) => {
        console.log(res.data)
      }).catch((e) => { console.log(e) })
      console.log(this.memeData[index])
    },
    async loadMoreTours ($state) {
      await this.$axios.get(`/main?page=${this.page}`).then((res) => {
        this.memeData.push.apply(this.memeData, res.data.resquert)
        if (res.data.resquert.length > 0) {
          this.page += 1
          $state.loaded()
        } else {
          $state.complete()
        }
      }).catch((e) => { console.log(e) })
    }
  }
}
</script>
<style scoped>
.item {
  display: inline-block;
  padding: 0.25rem;
  width: 100%;
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
</style>
