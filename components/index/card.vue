<template>
  <div class="w-100" style="padding-left:-25px">
    <div v-if="$auth.loggedIn && !userid" class="col-md-12 item">
      <div class="card-feed bg-white shadow-sm rounded">
        <div class="p-3">
          <div class="col-md-12 col-12 ">
            <form @submit.prevent="addPost">
              <textarea
                id=""
                ref="textarea"
                v-model="post.title"
                class="form-control input-modal p-0 bg-white pt-1"
                name=""
                cols="10"
                placeholder="Give your post title or description (drag drop image here)"
                rows="3"
                @keyup="heightoFtextArea(this)"
                @drop.prevent="onFileChange"
                @dragover.prevent
              />
              <tags-input
                v-if="tagOpen"
                v-model="tags"
                element-id="tags"
                :add-tags-on-space="false"
                :add-tags-on-comma="true"
                :typeahead="true"
              />

              <div
                class="my-3 float-left"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Attach a picture"
                style="width:20px;cursor: pointer;z-index:2"
                @click="showInputFile"
              >
                <i class="fas fa-image font-image color-main" />
                <input
                  ref="file"
                  type="file"
                  class="fileImage"
                  accept="image/png, image/jpeg, image/gif"
                  @change="onFileChange"
                >
              </div>
              <div
                class="my-3 float-left ml-3 pointeronly"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Attach a picture by url"
                @click="post.imageUrl = !post.imageUrl"
              >
                <i class="fas fa-link color-main" />
              </div>
              <div
                class="my-3 float-left ml-3 pointeronly"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Add tags"
                @click="tagOpen = !tagOpen"
              >
                <i class="fas fa-tags color-main" />
              </div>
              <div class="mt-1 float-right">
                <button
                  v-if="posting == false"
                  type="submit"
                  class="btn bg-main m-0 mt-2 pull-right float-right"
                >
                  Post
                </button>
                <button
                  v-else
                  type="submit"
                  class="btn bg-main m-0 mt-2 pull-right float-right"
                  disabled
                >
                  Posting..
                </button>
              </div>
              <div class="clearfix" />
              <div v-if="post.imageUrl" class="tags-input-root position-relative">
                <div class="tags-input-wrapper-default tags-input">
                  <input
                    v-model="post.image"
                    type="url"
                    class="form-control input-modal p-0 bg-white pt-1 pl-1 w-100"
                    required
                    placeholder="Image url"
                  >
                </div>
              </div>
              <div
                v-if="
                  (isUrl(post.image))
                "
                class="position-relative"
              >
                <img
                  v-lazy-load
                  :data-src="post.image"
                  width="100%"
                  class="rounded"
                  alt=""
                >
                <div style="position:absolute;top:3%;right:3%">
                  <div class="bg-dark rounded-circle pl-3 pr-3 pt-2 pb-2 pointer" @click="post.image = ''">
                    <i class="fas fa-times color-white" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(meme, i) in memeData" :key="i" class="col-md-12 item">
      <div class="card-feed bg-white shadow-sm rounded">
        <div class="p-3">
          <div class="name float-left w-80" style="width:80%">
            <div class="row">
              <div class="col-md-2 col-3">
                <nuxt-link
                  :to="`/u/${meme.m_username}`"
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
                          :xlink:href="meme.m_image"
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
              <div class="col-md-10 col-9 pl-0">
                <span
                  class="lend"
                ><strong><nuxt-link
                  class="text-decoration-none text-dark text-capitalize"
                  :to="`/u/${meme.m_username}`"
                >{{ meme.m_name }}</nuxt-link></strong></span>
                <br>
                <span
                  class="text-muted"
                >{{ $moment(parseInt(meme.p_date)) }}
                <!-- ·</span>
                <nuxt-link to="" class="text-decoration-none color-main">
                  Follow
                </nuxt-link> -->
                </span>
              </div>
            </div>
          </div>
          <div class="float-right">
            <div v-if="$auth.loggedIn" class="dropdown">
              <div class="" data-toggle="dropdown">
                <i class="fas fa-ellipsis-h pointeronly" />
              </div>
              <div
                v-if="meme.m_id == $auth.user.m_id"
                class="dropdown-menu dropdown-menu-tip-n dropdown-menu-right"
              >
                <button class="dropdown-item">
                  <i class="far fa-plus-square mr-2" /> Playlist
                </button>
                <hr class="p-0 m-2">
                <button class="dropdown-item" @click="deletePost(meme.p_id, i)">
                  <i class="far fa-trash-alt mr-2" /> Delete
                </button>
              </div>
              <div
                v-else
                class="dropdown-menu dropdown-menu-tip-n dropdown-menu-right"
              >
                <a
                  href="#"
                  class="dropdown-item"
                ><i class="far fa-plus-square mr-2" /> Playlist</a>
                <a
                  href="#"
                  class="dropdown-item"
                ><i class="far fa-flag mr-2" /> Report</a>
              </div>
            </div>
          </div>
          <div class="clearfix" />
        </div>
        <div class="content-meme pt-2 pl-4 pr-4 pb-3">
          <div v-if="meme.p_detail.length > 0">
            <span style="white-space: pre-line;">{{ meme.p_detail }}</span>
          </div>
          <div v-if="meme.p_hashtag.length > 0">
            <nuxt-link
              v-for="(hashtagH, index) in meme.p_hashtag.split(',')"
              :key="index"
              class="color-main"
              to=""
            >
              {{ `#${hashtagH}` }}
            </nuxt-link>
          </div>
        </div>
        <div class="position-relative">
          <img
            v-if="meme.p_image != ''"
            v-lazy-load
            width="100%"
            :data-src="meme.p_image"
            :alt="meme.p_detail + ' ID ' + meme.p_id"
          >
          <div
            v-if="
              meme.p_image.indexOf('.gif') >= 0
            "
            class="gifed"
          >
            GIF
          </div>
        </div>
        <div v-if="meme.p_tags.length > 0" class="mt-4 pl-4 pr-4">
          <div v-for="(tagser,it) in meme.p_tags.split(',')" :key="it">
            <nuxt-link to="" class="text-decoration-none">
              <span :class="{'float-left tags-input-badge':true,'bg-main-2':it == 1}">{{ tagser }}</span>
            </nuxt-link>
          </div>
          <div class="clearfix" />
        </div>
        <div class="p-3">
          <div class="row">
            <div v-if="$auth.loggedIn" class="col-md-4 col-4">
              <div
                v-show="
                  meme.liked != null && meme.liked.toString().split(',').includes($auth.user.m_id.toString())
                "
                class="text-center pt-2 pb-2 pointer click-haha color-main-2"
                @click="unlike(meme.p_id, i)"
              >
                <i class="mr-1 fas fa-laugh-squint haha" style="font-size:17px;" />
                <span style="matgin-top:-12px">{{ meme.likes }}</span>
              </div>
              <div
                v-show="
                  meme.liked == null || !meme.liked.toString().split(',').includes($auth.user.m_id.toString())
                "
                class="text-center pt-2 pb-2 pointer click-haha color-dark-3"
                @click="like(meme.p_id, i)"
              >
                <i class="mr-1 fas fa-laugh-squint haha" style="font-size:17px" />
                <span v-if="meme.likes > 0" style="matgin-top:-12px">{{
                  meme.likes
                }}</span>
              </div>
            </div>
            <div v-else class="col-md-4 col-4">
              <nuxt-link
                to="/auth/login"
                class="pointer text-decoration-none color-dark-3"
              >
                <div class="text-center pt-2 pb-2 pointer">
                  <i class="mr-1 fas fa-laugh-squint" style="font-size:17px" />
                  <span v-if="meme.likes > 0" style="matgin-top:-12px">{{
                    meme.likes
                  }}</span>
                </div>
              </nuxt-link>
            </div>
            <div class="col-md-4 col-4">
              <div
                class="text-center pt-2 pb-2 pointer color-dark-3"
                @click="commentShow(i)"
              >
                <i class="mr-1 fas fa-comments" />
                <span v-if="meme.comments > 0" style="matgin-top:-12px">{{
                  meme.comments
                }}</span>
              </div>
            </div>
            <div class="col-md-4 col-4">
              <div class="text-center pt-2 pb-2 pointer color-dark-3">
                <i class="mr-1 fas fa-share-square" />
                <span style="matgin-top:-12px" />
              </div>
            </div>
          </div>
          <comments
            v-if="meme.commentsShow == 1"
            :msg="meme.p_id"
            :index="i"
            @onCommentPost="onCommentPost"
          />
        </div>
      </div>
    </div>
    <client-only>
      <infinite-loading
        ref="InfiniteLoading"
        class="w-100"
        @infinite="loadMoreTours"
      >
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
import comments from '~/components/index/comments'

export default {
  name: 'Card',
  components: {
    comments
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    userid: Number
  },
  data () {
    return {
      onlyText: false,
      posting: false,
      post: {
        title: '',
        lang: 'English',
        image: '',
        imageUrl: false,
        tags: []
      },
      tags: [],
      tagOpen: false,
      memeData: [],
      page: 1
    }
  },
  mounted () {
    if (!this.$auth.loggedIn) {
      this.loadMoreTours()
    }
    // eslint-disable-next-line no-undef
    $(function () {
      // eslint-disable-next-line no-undef
      $('[data-toggle="tooltip"]').tooltip()
    })
  },
  methods: {
    showInputFile () {
      if (this.post.imageUrl === true) { this.$refs.file.click() }
      this.post.imageUrl = false
    },
    heightoFtextArea (o) {
      // console.log(this.post.tags[0].value)
      this.$refs.textarea.style.height = '25px'
      // this.$refs.textarea.style.height = '1px'
      this.$refs.textarea.style.height = (25 + this.$refs.textarea.scrollHeight) + 'px'
    },

    async deletePost (id, index) {
      await this.$axios
        .delete(`/delete/post/${id}`)
        .then((res) => {
          this.memeData.splice(index, 1)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    onCommentPost (i) {
      console.log(i)
      this.$set(
        this.memeData[i],
        'comments',
        (this.memeData[i].comments || 0) + 1
      )
    },
    async unlike (id, index) {
      // eslint-disable-next-line camelcase
      let liked = this.memeData[index].liked.toString().split(',')
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
        this.$set(
          this.memeData[index],
          'likes',
          (this.memeData[index].likes || 0) - 1
        )
        this.$set(this.memeData[index], 'liked', liked)
      }
      await this.$axios
        .delete(`/unlike/${id}`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    commentShow (index) {
      this.$set(
        this.memeData[index],
        'commentsShow',
        !this.memeData[index].commentsShow
      )
    },
    async like (id, index) {
      this.$set(
        this.memeData[index],
        'likes',
        (this.memeData[index].likes || 0) + 1
      )
      if (this.memeData[index].liked == null) {
        this.$set(this.memeData[index], 'liked', [this.$auth.user.m_id])
      } else {
        this.$set(
          this.memeData[index],
          'liked',
          this.memeData[index].liked + ',' + this.$auth.user.m_id
        )
        // this.memeData[index].liked.push(this.$auth.user.m_id)
      }
      await this.$axios
        .get(`/like/${id}`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((e) => {
          console.log(e)
        })
      console.log(this.memeData[index])
    },
    async loadMoreTours ($state) {
      let dataurl = `/main?page=${this.page}`
      if (this.userid) {
        dataurl = `/main?userid=${this.userid}&page=${this.page}`
      }
      await this.$axios
        .get(dataurl)
        .then((res) => {
          this.memeData.push.apply(this.memeData, res.data.resquert)
          if (res.data.resquert.length > 0) {
            this.page += 1
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    isUrl (s) {
      // const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
      if (s.includes('data:') || (s.includes('http') && (s.indexOf('.jpg') > 0 || s.indexOf('.jpeg') > 0 || s.indexOf('.png') > 0 || s.indexOf('.gif') > 0))) { return true }
      return false
    },
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      console.log(files[0].type)
      if (files[0].size > 800000) {
        this.$toast.error('Image size limit 800Kb').goAway(1500)
        // eslint-disable-next-line eqeqeq
      } else if (
        // eslint-disable-next-line eqeqeq
        files[0].type != 'image/png' &&
        // eslint-disable-next-line eqeqeq
        files[0].type != 'image/jpeg' &&
        // eslint-disable-next-line eqeqeq
        files[0].type != 'image/gif'
      ) {
        this.$toast.error('Not allowed file type (png,jpg,gif)').goAway(1500)
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
        vm.post.image = e.target.result
        // console.log(e.target.result)
      }
      reader.readAsDataURL(file)
    },
    addPost () {
      this.posting = true
      if (this.post.image === '') {
        this.onlyText = true
      }
      // if (this.post.image === '' && this.onlyText === false) {
      //   this.$toast.error('Image is empty').goAway(1500)
      // } else if (this.post.title === '' && this.onlyText === true) {
      //   this.$toast.error('Title or Description is empty').goAway(1500)
      // } else {
      if (this.post.image === '' && this.post.title === '') {
        this.$toast.error('Title or Description is empty').goAway(1500)
        this.posting = false
      } else {
        this.$toast.show('Posting...').goAway(1500)
        const valtag = []
        for (let i = 0; i < this.tags.length; i++) {
          valtag.push(this.tags[i].value)
        }
        this.post.tags = valtag.join(',')
        this.$axios
          .post('/post', this.post, {
            onUploadProgress: (progressEvent) => {
              console.log('success')
            }
          })
          .then((res) => {
            console.log(res.data.title)
            this.$toast.success('Post successful').goAway(1500)
            // eslint-disable-next-line no-undef
            $('#post').modal('hide')
            console.log(res.data.reqer.insertId)
            this.memeData.unshift({
              p_id: res.data.reqer.insertId,
              p_detail: res.data.title,
              p_image: this.post.image,
              p_lang: this.post.lang,
              p_tags: this.post.tags,
              p_hashtag: res.data.hashtag,
              p_date: Date.now(),
              m_id: this.$auth.user.m_id,
              m_name: this.$auth.user.m_name,
              m_image: this.$auth.user.m_image,
              m_username: this.$auth.user.m_username,
              likes: 0,
              liked: null,
              commentsShow: 0,
              comments: 0
            })
            this.post.title = ''
            this.post.lang = 'English'
            this.post.image = ''
            this.post.tags = []
            this.tags = []
            this.tagOpen = false
            this.post.imageUrl = false
            this.onlyText = false
            this.posting = false
          })
      }
    }
  }
}
</script>
<style scoped>
.gifed {
  position: absolute;
  top: 3%;
  right: 3%;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  padding: 1px 8px 0px 8px;
}
.item {
  display: inline-block;
  padding: 0.25rem;
  width: 100%;
}
.pointer {
  padding-top: 2px;
  cursor: pointer;
}
.pointer:hover {
  border-radius: 4px;
  background:white;
  /* color:#3c424b; */
  cursor: pointer;
  box-shadow:0 .125rem .25rem rgba(0,0,0,.075)!important
}
::-webkit-resizer {
  display: none;
}
.pointeronly {
  cursor: pointer;
}
div.dropdown-item:focus {
  background: #8338ec !important;
}
[class*="dropdown-menu-tip-"]::after {
  content: "";
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  background-color: white;
  border: solid 1px rgba(0, 0, 0, 0.15);
  border-bottom: none;
  border-left: none;
}
.dropdown-menu-tip-n::after {
  top: calc(-0.25rem - 1px);
  right: 0.4rem;
  transform: rotate(-45deg);
}
.dropdown-menu-tip-n {
  width: 15%;
}
.md-form.md-outline label.active {
  left: 8px;
  padding-right: 5px;
  padding-left: 5px;
  font-weight: 500;
  background: #3c424b;
  -webkit-transform: translateY(-13px) scale(0.8);
  transform: translateY(-13px) scale(0.8);
}
.input-modal {
  background: #f7f7f7;
  border: none;
  color: #212121;
}
.input-modal:focus {
  outline: none;
}

.pl-text {
  margin-left: -3%;
  padding-right: 5px;
}

.image-dragdrop {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
  cursor: pointer;
}
::placeholder {
  color: #212121 !important;
  opacity: 0.7; /* Firefox */
}

:-ms-input-placeholder {
  color: #212121 !important;
}

::-ms-input-placeholder {
  color: #212121 !important;
}

.fileImage {
  position: absolute;
  left: 0px;
  bottom: 15px;
  width: 30px;
  opacity: 0;
  cursor: pointer;
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
