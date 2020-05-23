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
            <div v-if="$auth.loggedIn" class="col-md-12 item">
              <div class="card-feed bg-white shadow-sm rounded">
                <div class="p-3">
                  <div class="row">
                    <div class="col-md-2 col-3">
                      <div class="pr-3">
                        <img
                          v-lazy-load
                          :data-src="$auth.user.m_image"
                          class="rounded-circle image-avatar"
                          alt=""
                        >
                      </div>
                    </div>
                    <div class="col-md-10 col-9 pl-0 pl-text">
                      <form @submit.prevent="addPost">
                        <textarea
                          id=""
                          v-model="post.title"
                          class="form-control input-modal"
                          name=""
                          cols="10"
                          placeholder="Give your post title or description (drag drop image here)"
                          rows="3"
                          @drop.prevent="onFileChange"
                          @dragover.prevent
                        />
                        <div v-if="post.imageUrl" class="w-50 mt-2">
                          <input v-model="post.image" type="url" class="form-control input-modal" required placeholder="image url">
                        </div>
                        <div
                          class="my-3 float-left"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Attach a picture"
                          style="width:20px;cursor: pointer;z-index:2"
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
                        <div class="mt-1 float-right">
                          <button v-if="posting == false" type="submit" class="btn bg-main m-0 mt-2 pull-right float-right">
                            Post
                          </button>
                          <button v-else type="submit" class="btn bg-main m-0 mt-2 pull-right float-right" disabled>
                            Posting..
                          </button>
                        </div>
                        <div class="clearfix" />

                        <div v-if="post.image != '' || (isUrl(post.image) && post.imageUrl == true)">
                          <img
                            v-lazy-load
                            :data-src="post.image"
                            width="100%"
                            class="rounded"
                            alt=""
                          >
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                        <a href="#" class="dropdown-item"><i class="far fa-plus-square mr-2" /> Playlist</a>
                        <hr class="p-0 m-2">
                        <a href="#" class="dropdown-item"><i class="far fa-trash-alt mr-2" /> Delete</a>
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
import comments from '~/components/comments'
export default {
  name: 'Index',
  scrollToTop: true,
  components: {
    comments
  },
  data () {
    return {
      onlyText: false,
      posting: false,
      post: {
        title: '',
        lang: 'English',
        image: '',
        imageUrl: false
      },
      setLater: false,
      memeData: [],
      page: 1,
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
    isUrl (s) {
      const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
      return regexp.test(s)
    },
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
      } else if (files[0].type != 'image/png' && files[0].type != 'image/jpeg' && files[0].type != 'image/gif') {
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
        this.$axios.post(
          '/post',
          this.post,
          {
            onUploadProgress: (progressEvent) => {
              console.log('success')
            }
          }
        ).then((res) => {
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
            p_hashtag: res.data.hashtag,
            p_date: '1589395601190',
            m_id: this.$auth.user.m_id,
            m_name: this.$auth.user.m_name,
            m_image: this.$auth.user.m_image,
            likes: 0,
            liked: null,
            commentsShow: 0,
            comments: 0
          })
          this.post.title = ''
          this.post.lang = 'English'
          this.post.image = ''
          this.post.imageUrl = false
          this.onlyText = false
          this.posting = false
        })
      }

      // }
    },
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
[class*="dropdown-menu-tip-"]::after {
  content: '';
  position: absolute;
  width: .5rem;
  height: .5rem;
  background-color: white;
  border: solid 1px rgba(0, 0, 0, .15);
  border-bottom: none;
  border-left: none;
}
.dropdown-menu-tip-n::after {
  top: calc(-.25rem - 1px);
  right: 0.4rem;
  transform: rotate(-45deg);
}
.dropdown-menu-tip-n {
  width:15%;
}
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
.input-modal:focus{
  outline:none;
}

.pl-text{
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
.bg-drogdrop {
  width: 100%;
  background: url("/selectimage2.jpg");
  height: 300px;
  border-radius: 6px 6px 0 0;
  background-size: cover;
}
.modal-content {
  border-radius: 6px !important;
  background: #3c424b;
  color: white;
}
.fileImage {
  position: absolute;
  left: 0px;
  bottom:15px;
  width: 30px;
  opacity: 0;
  cursor: pointer;
}

.exit-modal {
  font-size: 20px;
  color: white;
  right: -20px;
  top: -20px;
  padding: 1% 2.5%;
  background: #3c424b;
  border-radius: 50px;
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
.color-main {
  color: #00a8e8;
}
.color-dark {
  color: #212121;
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
