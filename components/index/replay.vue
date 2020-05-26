<template>
  <div class="">
    <div v-if="$auth.loggedIn" class="mt-1" style="margin-left:-15px">
      <form class="row pr-1" autocomplete="off" @submit.prevent="sendReplay">
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
    <div v-if="replayComment.length > 0" style="margin-left:-15px">
      <div v-for="(c, i) in replayComment" :key="i" class="row mt-2 pr-1">
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
                <span class="color-main text-capitalize"> {{ c.m_name }}</span> <span class="color-dark-3">·</span> <span class="color-dark-3 font-smal"> {{ ($moment(parseInt(c.r_date))).replace(' minutes','m').replace(' hours','h').replace(' days','d') }}</span>
                <br>
                {{ c.r_comment }}
                <br>
              </div>
              <div v-if="c.r_image != ''">
                <img v-lazy-load :data-src="c.r_image" class="rounded mt-2" width="100%" :alt="c.r_comment">
              </div>
              <div class="mt-1 ml-1 color-dark-3">
                <!-- like comment -->
                <!-- <span v-if="$auth.loggedIn" :class="{'mr-1 pointer':true,'color-main':c.liked != null && c.liked.includes($auth.user.m_id)}" @click="likeComment(c.c_id,i)"><i class="fas fa-laugh-squint " style="font-size:15px;" /><span v-if="c.likes > 0" class="ml-2">{{ c.likes }}</span></span> -->
                <!-- <span v-else :class="{'mr-1 pointer':true}"><i class="fas fa-laugh-squint " style="font-size:15px;" /><span v-if="c.likes > 0" class="ml-2">{{ c.likes }}</span></span> -->
                <!-- replay -->
                <!-- <span :class="{'pointer':true,'color-main':c.replaycount > 0}" @click="c.replay = !c.replay"> <i class="fas fa-reply" style="font-size:15px;" /> <span v-if="c.replaycount > 0">{{ c.replaycount }}</span> replay</span> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-1 col-1 mt-3 pl-0">
          <i class="fas fa-ellipsis-h" />
        </div>
        <div class="col-md-2 pr-0" />
        <div class="col-md-10 pl-0">
          <div v-if="c.replay" class="">
            <replay :cidget="c.c_id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Replay',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    cidget: Number,
    // eslint-disable-next-line vue/require-default-prop
    pidget: Number
  },
  data () {
    return {
      replayComment: [],
      massage: '',
      image: ''
    }
  },
  async mounted () {
    const dataReplay = await this.$axios.get(`/replay/${this.cidget}`)
    console.log(dataReplay.data)
    this.replayComment = dataReplay.data
  },
  methods: {
    sendReplay () {
      this.$axios
        .post(
          '/comment/replay',
          {
            c_id: this.cidget,
            c_pid: this.pidget,
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
          this.replayComment.unshift({
            r_id: res.data.insertId,
            r_mid: this.$auth.user.m_id,
            r_cid: this.cidget,
            r_pid: this.pidget,
            r_image: this.image,
            r_comment: this.massage,
            m_username: this.$auth.user.m_username,
            m_image: this.$auth.user.m_image,
            m_name: this.$auth.user.m_name,
            r_date: Date.now()
          })
          this.massage = ''
          this.image = ''
          console.log(res.data.insertId)
          // eslint-disable-next-line no-undef
        })
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
    }
  }
}
</script>

<style scoped>
.addPhoto {
  color: white;
  background: #615dfa;
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
  width: 100%;
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
</style>
