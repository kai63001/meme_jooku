<template>
  <div class="pt-3">
    <div>
      <div v-if="$auth.loggedIn" class="mt-2">
        <form class="row" autocomplete="off" @submit.prevent="sendMeme">
          <div class="col-md-11 col-11">
            <div class="row">
              <div class="col-md-2 col-3">
                <div class="">
                  <nuxt-link
                    :to="`/u/${$auth.user.m_username}`"
                    class="position:relative"
                  >
                    <svg viewBox="-5 0 40 40" class="circular-chart">
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
                  </nuxt-link>
                </div>
              </div>
              <div class="col-md-10 col-9 pl-0">
                <span class="color-main text-capitalize"> {{ $auth.user.m_name }}</span>
                <div class="row">
                  <div class="col-md-12">
                    <input
                      v-model="massage"
                      type="text"
                      name="massage"
                      class="form-control input-comment"
                      placeholder="Write a comment..."
                      required
                    >
                    <div
                      class="position-absolute pointer"
                      style="top:20%;right:7%"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Attach a picture"
                    >
                      <i class="fas fa-image pointer" />
                      <input
                        ref="file"
                        type="file"
                        class="fileImage pointer"
                        accept="image/png, image/jpeg, image/gif"
                        @change="onFileChange"
                      >
                    </div>
                  </div>
                </div>
                <div v-if="image != ''">
                  <img v-lazy-load :data-src="image" class="rounded mt-2" width="100%" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-1 col-1 pt-4 pl-0 ml-10">
            <button type="submit" class="btn bg-main">
              <i class="fas fa-paper-plane" />
            </button>
          </div>
        </form>
      </div>
      <div v-else class="text-center">
        <nuxt-link class="pl-1 color-main-2 pr-1" to="/auth/login">
          Sign in
        </nuxt-link>
        or
        <nuxt-link class="pl-1 color-main" to="/auth/register">
          Create an Account
        </nuxt-link>
        to leave a comment.
      </div>
      <div v-if="comments.length > 0">
        <div v-for="(c, i) in comments" :key="i" class="row mt-2">
          <div class="col-md-11 col-11">
            <div class="row">
              <div class="col-md-2 col-3" style="width:60%">
                <nuxt-link
                  :to="`/u/${c.m_username}`"
                  class="position:relative"
                >
                  <svg viewBox="-5 0 40 40" class="circular-chart">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#00bbf9" />
                        <stop offset="100%" stop-color="#635dff" />
                      </linearGradient>
                      <pattern
                        :id="`img_comment_${i}`"
                        x="0%"
                        y="0%"
                        height="100%"
                        width="100%"
                        viewBox="0 0 40 40"
                      >
                        <image
                          :xlink:href="c.m_image"
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
                      stroke-dasharray="64, 100"
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
                      :fill="`url(#img_comment_${i})`"
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
              <div class="col-md-10 col-9 pl-0">
                <div class="comment">
                  <span class="color-main text-capitalize"> {{ c.m_name }}</span> <span class="color-dark-3">·</span> <span class="color-dark-3 font-smal"> {{ ($moment(parseInt(c.c_date))).replace(' minutes','m').replace(' hours','h').replace(' days','d') }}</span>
                  <br>
                  {{ c.c_comment }}
                  <br>
                </div>
                <div v-if="c.c_image != ''">
                  <img v-lazy-load :data-src="c.c_image" class="rounded mt-2" width="100%" :alt="c.c_comment">
                </div>
                <div class="mt-1 ml-1 color-dark-3 ">
                  <!-- like comment -->
                  <!-- {{ c.liked }} -->
                  <span v-if="$auth.loggedIn" :class="{'mr-1 pointer':true,'color-main-2 click-haha':c.liked != null && c.liked.toString().split(',').includes($auth.user.m_id.toString())}" @click="likeComment(c.c_id,i)"><i class="fas fa-laugh-squint haha" style="font-size:15px;" /><span v-if="c.likes > 0" class="ml-2">{{ c.likes }}</span></span>
                  <span v-else :class="{'mr-1 pointer':true}"><i class="fas fa-laugh-squint haha" style="font-size:15px;" /><span v-if="c.likes > 0" class="ml-2">{{ c.likes }}</span></span>
                  <!-- replay -->
                  <span :class="{'pointer':true,'color-main':c.replaycount > 0}" @click="c.replay = !c.replay"> <i class="fas fa-reply" style="font-size:15px;" /> <span v-if="c.replaycount > 0">{{ c.replaycount }}</span> replay</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-1 col-1 mt-3 pl-0">
            <i class="fas fa-ellipsis-h" />
          </div>
          <div class="col-md-2 col-2 pr-0" />
          <div class="col-md-10 col-10 pl-0">
            <div v-if="c.replay" class="">
              <replay :cidget="c.c_id" :pidget="msg" />
            </div>
          </div>
        </div>
      </div>
      <!-- show more comment system -->
      <div v-if="page < lastPage">
        <div class="pointer mt-3 text-center color-dark-2" @click="showMoreMeme();loadmore=true">
          Load more comments <span v-if="loadmore"><i class="fas fa-circle-notch fa-spin" /></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import replay from '~/components/index/replay'
export default {
  name: 'Comments',
  components: {
    replay
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    msg: Number,
    // eslint-disable-next-line vue/require-default-prop
    index: Number
  },
  data () {
    return {
      replayitem: 0,
      loadmore: false,
      comments: [],
      meme: false,
      massage: '',
      image: '',
      lastPage: 1,
      page: 1
    }
  },
  async created () {
    // eslint-disable-next-line no-undef
    $(function () {
      // eslint-disable-next-line no-undef
      $('[data-toggle="tooltip"]').tooltip()
    })
    const dataComment = await this.$axios.get(`/comment/${this.msg}`)
    this.comments = dataComment.data.reqer
    this.lastPage = dataComment.data.lastPage
  },
  methods: {
    async likeComment (id, index) {
      // ตรวจสอบว่า กด like แล้ว
      if (this.comments[index].liked != null && this.comments[index].liked.toString().split(',').includes(this.$auth.user.m_id.toString())) {
        await this.$axios.delete(`/unlike/${id}?s=comment&pid=${this.msg}`).then((res) => {
          console.log(res.data)
        }).catch((e) => { console.log(e) })
        let liked = this.comments[index].liked.toString().split(',')
        console.log('liked :' + liked)
        // eslint-disable-next-line camelcase
        const index_dele = liked.indexOf(this.$auth.user.m_id.toString())
        // eslint-disable-next-line camelcase
        console.log('index_dele :' + index_dele)
        // eslint-disable-next-line camelcase
        if (index_dele > -1) {
          if (liked.includes(',')) {
            // liked = liked.split(',')
            liked.splice(index_dele, 1)
          } else {
            liked = ''
          }
          console.log(liked)
          this.$set(this.comments[index], 'likes', (this.comments[index].likes || 0) - 1)
          this.$set(this.comments[index], 'liked', liked)
        }
      } else {
        await this.$axios.get(`/like/${id}?s=comment&pid=${this.msg}`).then((res) => {
          console.log(res.data)
        }).catch((e) => { console.log(e) })
        this.$set(this.comments[index], 'likes', (this.comments[index].likes || 0) + 1)
        if (this.comments[index].liked == null) {
          this.$set(this.comments[index], 'liked', this.$auth.user.m_id.toString())
        } else {
          this.$set(this.comments[index], 'liked', this.comments[index].liked + ',' + this.$auth.user.m_id)
        }
        console.log(this.comments[index].liked)
      }
    },
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      console.log(files[0].size)
      if (files[0].size > 800000) {
        this.$toast.error('Image size limit 800Kb').goAway(1500)
      } else {
        this.createImage(files[0])
      }
      // eslint-disable-next-line camelcase
      // const file_image = this.$refs.file.files[0]
      // const formData = new FormData()
      // formData.append('file', file_image)

      // console.log(file_image)
    },
    createImage (file) {
      // eslint-disable-next-line no-unused-vars
      const image = new Image()
      const reader = new FileReader()
      const vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
        // console.log(e.target.result)
      }
      reader.readAsDataURL(file)
    },
    // show more comments system
    async showMoreMeme () {
      this.page += 1
      const dataComment = await this.$axios.get(`/comment/${this.msg}?page=${this.page}`)
      this.comments.push.apply(this.comments, dataComment.data.reqer)
      this.loadmore = false
    },
    sendMeme () {
      this.$axios
        .post(
          '/addcomment',
          {
            c_pid: this.msg,
            c_comment: this.massage,
            image: this.image
          },
          {
            onUploadProgress: (progressEvent) => {
              console.log('success')
            }
          }
        )
        .then((res) => {
          this.comments.unshift({
            c_id: res.data.insertId,
            c_mid: this.$auth.user.m_id,
            c_comment: this.massage,
            c_image: this.image,
            m_id: this.$auth.user.m_name,
            m_name: this.$auth.user.m_name,
            m_image: this.$auth.user.m_image,
            c_date: Date.now(),
            replay: false
          })
          this.$emit('onCommentPost', this.index)
          this.massage = ''
          this.image = ''
          this.meme = false
          console.log(res.data.insertId)
          // eslint-disable-next-line no-undef
        })
    }
  }
}
</script>
<style scoped>
.addPhoto {
  color: white;
  background: #635dff;
  padding: 5px 10px;
  border-radius: 4px;
}
.comment {
  width: 100%;
  background: #f7f7f7;
  color: #212121;
  padding: 5px 20px;
  border-radius: 4px;
}

.comment2 {
  width: 100%;
  background: #f7f7f7;
  color: #212121;
  padding: 5px 20px;
  border-radius: 4px 4px 0px 0px;
}
.image-comment2{
  border-radius: 0px 0px 4px 4px;

}
.input-comment {
  background: #f7f7f7;
  border: none;
  padding: 5px 20px;
}
::placeholder {
  color: #212121 !important;
  opacity: 0.7; /* Firefox */
}
.font-smal{
  font-size:14px
}

:-ms-input-placeholder {
  color: #212121 !important;
}

::-ms-input-placeholder {
  color: #212121 !important;
}
.ml-10 {
  margin-left: -10px;
}

.pointer {
  cursor: pointer;
}
.pointer:hover {
  cursor: pointer;
}
.fileImage {
  position: absolute;
  left: 0px;
  width: 100%;
  opacity: 0;
  cursor: pointer;
}
.fileImage:hover {
  cursor: pointer;
}
.no-btn{
  background: none;
  border:none;
}
.click-haha .haha {
  animation: funny 1s ease-out forwards;
}
@keyframes funny {
  0% {
    transform: rotate(40deg);
  }
  30% {
    transform: rotate(-40deg);
  }
  60% {
    transform: rotate(40deg);
  }
}
</style>
