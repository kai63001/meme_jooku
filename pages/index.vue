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
          <ul class="navbar-nav mr-auto">
            <button
              v-if="$auth.loggedIn"
              class="pt-1 pb-1 shadow-sm btn btn-newpost"
              data-toggle="modal"
              data-target="#post"
            >
              <i class="fas fa-plus-square mr-1" /> New post
            </button>
            <!-- <li class="nav-item dropdown">
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider" />
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li> -->
          </ul>
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
        <div class="col-md-3 d-none d-lg-block">
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
                        <span class="text-muted">5m ·</span>
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
                    <i class="fas fa-ellipsis-h" />
                  </div>
                  <div class="clearfix" />
                </div>
                <div class="content-meme pl-4 pr-4 pb-3">
                  <div v-if="meme.p_detail.length > 0">
                    <span style="white-space: pre-line;">{{ meme.p_detail }}</span>
                  </div>
                  <div v-if="meme.p_hashtag.length > 0">
                    <nuxt-link v-for="(hashtag,index) in meme.p_hashtag.split(',')" :key="index" class="color-main" to="">
                      {{ `#${hashtag}` }}
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
                      <div class="text-center pt-2 pb-2 pointer">
                        <i class="far fa-laugh-squint" style="font-size:17px" />
                        <span style="matgin-top:-12px">{{ meme.likes }}</span>
                      </div>
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
              <infinite-loading ref="InfiniteLoading" @infinite="loadMoreTours" />
            </client-only>
            <br><br>
          </div>
          <br>
        </div>
        <div class="col-md-3 d-none d-lg-block pr-3 bg-bg ">
          <br>
          <br>
          <div class="pr-4">
            <div class="bg-white rounded">
              <div class="pl-2 pt-3 border-bottom">
                <h4>Trends for you</h4>
              </div>
              <nuxt-link to="" class="text-decoration-none text-dark">
                <div class="p-3  border-bottom">
                  <div class="color-main">
                    #555
                  </div>
                  <span>21K Hashtags</span>
                </div>
              </nuxt-link>
              <nuxt-link to="" class="text-decoration-none text-dark">
                <div class="p-3  border-bottom">
                  <div class="color-main">
                    #haha
                  </div>
                  <span>11K Hashtags</span>
                </div>
              </nuxt-link>
              <nuxt-link to="" class="text-decoration-none text-dark">
                <div class="p-3  border-bottom">
                  <div class="color-main">
                    #gamer
                  </div>
                  <span>9K Hashtags</span>
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
    <div
      id="post"
      ref="vuemodal"
      class="modal fade  bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="postTitle"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-lg w-50"
        role="document"
      >
        <div class="modal-content border-0 ">
          <form @submit.prevent="addPost">
            <div v-if="onlyText == false && post.imageUrl == false" class="image-upload position-relative">
              <label for="file-input">
                <img
                  v-lazy-load
                  :data-src="post.image == ''?'/selectimage2.jpg':post.image"
                  width="100%"
                  class="img-radius"
                  alt=""
                >
              </label>
              <input
                id="file-input"
                ref="file"
                class="display-none image-dragdrop"
                type="file"
                accept="image/png, image/jpeg, image/gif"
                required
                @change="onFileChange"
              >
            </div>
            <div
              type="button"
              data-dismiss="modal"
              aria-label="Close"
              class="shadow position-absolute exit-modal"
            >
              <i class="fas fa-times" />
            </div>
            <div class="pl-3 pr-3 pb-3 pt-3">
              <div class="text-center mb-1">
                <a :class="onlyText === true?'disabled btn btn-red mt-1':'btn btn-red mt-1'" @click="post.imageUrl = !post.imageUrl;post.image = ''">
                  <span v-if="post.imageUrl == false"> Use image URL</span>
                  <span v-else>Upload image</span>
                </a>
                <a class="btn btn-green mt-1" @click="onlyText = !onlyText">
                  <span v-if="onlyText == false"> Only Text</span>
                  <span v-else>Image</span>
                </a>
              </div>
              <br>
              <input
                v-if="post.imageUrl == true && onlyText == false"
                id="title"
                v-model="post.image"
                type="url"
                class="form-control input-modal mb-2"
                placeholder="Paste image URL"
                required
              >
              <textarea
                id="title"
                v-model="post.title"
                type="text"
                class="form-control input-modal"
                placeholder="Give your post title or description"
              />
              <div class="float-left w-50 mt-2">
                <select v-model="post.lang" class="form-control input-modal ">
                  <option :value="post.lang" selected>
                    English
                  </option>
                  <option value="thai">
                    Thai
                  </option>
                  <option value="french">
                    French
                  </option>
                </select>
              </div>
              <button type="submit" class="btn bg-main m-0 mt-2 pull-right float-right">
                Post
              </button>
              <div class="clearfix" />
            </div>
          </form>
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
      post: {
        title: '',
        lang: 'english',
        image: '',
        imageUrl: false
      },
      setLater: false,
      memeData: [],
      page: 1
    }
  },
  created () {
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
      this.$set(this.memeData[index], 'commentsShow', 1)
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
        vm.post.image = e.target.result
        // console.log(e.target.result)
      }
      reader.readAsDataURL(file)
    },
    addPost () {
      this.$toast.show('Posting...').goAway(1500)
      if (this.post.image === '' && this.onlyText === false) {
        this.$toast.error('Image is empty').goAway(1500)
      } else if (this.post.title === '' && this.onlyText === true) {
        this.$toast.error('Title or Description is empty').goAway(1500)
      } else {
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
          this.post.lang = 'english'
          this.post.image = ''
          this.post.imageUrl = false
          this.onlyText = false
        })
      }
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
  border: none;
  background-color: #272a33;
  color: white;
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
  color: white !important;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  color: white !important;
}

::-ms-input-placeholder {
  color: white !important;
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
.border-bottom {
  border-bottom: 1px solid #ddd;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
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
