<template>
  <div class="pt-3">
    <div>
      <div v-if="$auth.loggedIn" class="mt-2">
        <form class="row" autocomplete="off" @submit.prevent="sendMeme">
          <div class="col-md-11 col-11">
            <div class="row">
              <div class="col-md-2 col-3">
                <div class="pl-2">
                  <img
                    v-lazy-load
                    :data-src="$auth.user.m_image"
                    class="rounded-circle image-avatar"
                    alt=""
                  >
                </div>
              </div>
              <div class="col-md-10 col-9 pl-0">
                <span class="color-main"> {{ $auth.user.m_name }}</span>
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
      <div v-if="comments.length > 0">
        <div v-for="(c, i) in comments" :key="i" class="row mt-2">
          <div class="col-md-11 col-11">
            <div class="row">
              <div class="col-md-2 col-3">
                <div class="pl-2">
                  <img
                    v-lazy-load
                    :data-src="c.m_image"
                    class="rounded-circle image-avatar"
                    width="100%"
                    alt=""
                  >
                </div>
              </div>
              <div class="col-md-10 col-9 pl-0">
                <div class="comment">
                  <span class="color-main"> {{ c.m_name }}</span>
                  <br>
                  {{ c.c_comment }}
                </div>
                <div v-if="c.c_image != ''">
                  <img v-lazy-load :data-src="c.c_image" class="rounded mt-2" width="100%" :alt="c.c_comment">
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-1 col-1 mt-3 pl-0">
            <i class="fas fa-ellipsis-h" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Comments',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    msg: Number,
    // eslint-disable-next-line vue/require-default-prop
    index: Number
  },
  data () {
    return {
      comments: [],
      meme: false,
      massage: '',
      image: ''
    }
  },
  async created () {
    // eslint-disable-next-line no-undef
    $(function () {
      // eslint-disable-next-line no-undef
      $('[data-toggle="tooltip"]').tooltip()
    })
    const dataComment = await this.$axios.get(`/comment/${this.msg}`)
    this.comments = dataComment.data
  },
  methods: {
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
          console.log(res.data.title)
          // eslint-disable-next-line no-undef
        })
      this.$emit('onCommentPost', this.index)
      this.comments.unshift({
        c_id: 2,
        c_mid: 6,
        c_comment: this.massage,
        c_image: this.image,
        m_id: 6,
        m_name: this.$auth.user.m_name,
        m_image: this.$auth.user.m_image
      })
      this.massage = ''
      this.image = ''
      this.meme = false
    }
  }
}
</script>
<style scoped>
.addPhoto {
  color: white;
  background: #00a8e8;
  padding: 5px 10px;
  border-radius: 4px;
}
.comment {
  width: 100%;
  background: #ededed;
  color: #212121;
  padding: 5px 20px;
  border-radius: 4px;
}

.comment2 {
  width: 100%;
  background: #ededed;
  color: #212121;
  padding: 5px 20px;
  border-radius: 4px 4px 0px 0px;
}
.image-comment2{
  border-radius: 0px 0px 4px 4px;

}
.input-comment {
  background: #ededed;
  border: none;
  padding: 5px 20px;
}
::placeholder {
  color: #212121 !important;
  opacity: 1; /* Firefox */
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
</style>
