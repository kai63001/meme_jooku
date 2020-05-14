<template>
  <div>
    <div class="row">
      <div class="col-md-8 ml-4 bg-left">
        <div class="p-3">
          <nuxt-link to="/" class="text-muted">
            <i class="fas fa-arrow-left" /> Back to Home
          </nuxt-link>
        </div>
        <div class="row h-100 w-100">
          <div class="col-sm-12 text-center mx-auto my-auto">
            <div class="mt-center">
              <h1 class="color-main mb-4">
                Sign in to Meme
              </h1>
              <nuxt-link to="/">
                <span class="social-cir">
                  <i class="fab fa-facebook" />
                </span>
              </nuxt-link>
              <nuxt-link to="/" class="ml-1">
                <span class="social-cir">
                  <i class="fab fa-google" />
                </span>
              </nuxt-link>
              <nuxt-link to="/" class="ml-1">
                <span class="social-cir">
                  <i class="fab fa-github" />
                </span>
              </nuxt-link>
              <br>
              <br>
              <span class="text-muted">or use your email account:</span>
              <div class="container wdcon mt-1">
                <form @submit.prevent="login">
                  <div class="md-form md-outline input-with-pre-icon">
                    <i class="fas fa-envelope input-prefix" />
                    <input
                      v-model="loginData.username"
                      name="email"
                      type="email"
                      class="form-control input-dark"
                      placeholder="Email"
                      required
                    >
                  </div>
                  <div class="md-form md-outline input-with-pre-icon">
                    <i class="fas fa-lock input-prefix" />
                    <input
                      v-model="loginData.password"
                      name="password"
                      type="password"
                      class="form-control input-dark"
                      placeholder="Password"
                      required
                    >
                  </div>
                  <nuxt-link to="/" class="color-main">
                    Forget your password?
                  </nuxt-link>
                  <br>
                  <br>
                  <button type="submit" class="btn-signin">
                    SIGN IN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="bg-right d-none d-lg-block">
          <div class="row h-100 w-100">
            <div class="col-sm-12 text-center mx-auto my-auto color-white">
              <div class="right-main">
                <h2>Hello, Friend!</h2>
                <br>
                <span>Enter your personal detail <br>
                  and start enjoy with us</span>
                <br><br>
                <br>
                <nuxt-link to="/auth/register" class="btn-signup">
                  SIGN UP
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <!-- <img src="/bannerright.jpg" width="100%" height="100%" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data () {
    return {
      loginData: {
        username: '',
        password: ''
      }

    }
  },
  mounted () {
    // this.storeToken()
    // if (process.browser) {
    //   this.data = localStorage.getItem('authToken')
    // }
  },
  methods: {
    async login () {
      try {
        this.$toast.show('Logging in...').goAway(1500)
        const response = await this.$auth.loginWith('local', { data: this.loginData })
        console.log(response)
        this.$router.push('/')
        this.$toast.success('Successfully authenticated').goAway(1500)
      } catch (err) {
        console.log('errorrrr')
        console.log(err)
        this.$toast.error('Error while authenticating').goAway(1500)
      }
    }
    // storeToken () {
    //   if (process.browser) {
    //     localStorage.setItem('authToken', '5555')
    //   }
    // }
  },
  head () {
    return {
      title: 'Login',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.16.0/css/mdb.min.css'
        },
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css'
        }
      ],
      script: [
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.16.0/js/mdb.min.js',
          type: 'text/javascript'
        }
      ]
    }
  }
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter,
.page-leave-active {
  right: 100%; /*or bottom, top, right*/
  margin-right: -300px; /*or bottom, top, right */
}
.btn-signup {
  border: 2px solid white;
  color: white;
  border-radius: 50px;
  padding: 4% 20%;
  text-decoration: none;
}
.btn-signup:hover {
  background: white;
  color: #212121;
  text-decoration: none;
}
.right-main {
  margin-top: -25%;
  margin-left: 10%;
}
.btn-signin {
  background: #00a8e8 !important;
  color: white;
  box-shadow: none;
  padding: 15px 70px;
  border-radius: 50px;
  border: none;
  outline: none;
}
.btn-signin:focus {
  background: #0488bd !important;
  color: white;
  box-shadow: none;
  padding: 15px 70px;
  border-radius: 50px;
  border: none;
  outline: none;
}
.input-prefix {
  margin-top: -0.2%;
}
.input-dark {
  background: #f4f8f7 !important;
  border: 2px solid #f4f8f7 !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
.input-dark:hover + .input-prefix {
  color: #212121 !important;
}
.input-prefix {
  color: #a8adac !important;
}
::placeholder {
  color: #a8adac;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  color: #a8adac;
}

::-ms-input-placeholder {
  color: #a8adac;
}
.wdcon {
  width: 55%;
}
.social-cir {
  padding: 1.5% 1.5%;
  border: 2px solid #dddd;
  border-radius: 50px;
  color: #212121;
  transition: 0.2s;
}
.social-cir:hover {
  background-color: #dddd;
  border: 2px solid #dddd;
}
.bg-right {
  height: 100%;
  width: 33%;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  overflow-x: hidden;
  padding-top: 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/bannerright.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  height: 100%;
}
.col-md-4 {
  overflow: hidden;
  padding-bottom: 100% !important;
  margin-bottom: -100% !important;
}
.mt-center {
  padding-top: 5%;
}
.bg-left {
  height: 100%;
  background: white;
  overflow: hidden;
}
.col-md-8 {
  padding-bottom: 100% !important;
  margin-bottom: -100% !important;
}
.md-form.md-outline input[type="text"]:focus:not([readonly]),
.md-form.md-outline input[type="password"]:focus:not([readonly]),
.md-form.md-outline input[type="email"]:focus:not([readonly]),
.md-form.md-outline input[type="url"]:focus:not([readonly]),
.md-form.md-outline input[type="time"]:focus:not([readonly]),
.md-form.md-outline input[type="date"]:focus:not([readonly]),
.md-form.md-outline input[type="datetime-local"]:focus:not([readonly]),
.md-form.md-outline input[type="tel"]:focus:not([readonly]),
.md-form.md-outline input[type="number"]:focus:not([readonly]),
.md-form.md-outline input[type="search-md"]:focus:not([readonly]),
.md-form.md-outline input[type="search"]:focus:not([readonly]),
.md-form.md-outline textarea.md-textarea:focus:not([readonly]) {
  border-color: #f4f8f7 !important;
  box-shadow: inset 0 0 0 1px #f4f8f7;
  color: #212121;
}
@media only screen and (max-width: 600px) {
  .wdcon {
    width: 100%;
  }
}
</style>
