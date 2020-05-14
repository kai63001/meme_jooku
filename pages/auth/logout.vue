<template>
  <div>
    logout
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
  async mounted () {
    try {
      await this.$auth.logout()
      this.$router.push('/')
    } catch (err) {
      console.log(err)
    }
    // this.storeToken()
    // if (process.browser) {
    //   this.data = localStorage.getItem('authToken')
    // }
  },
  methods: {
    async login () {
      try {
        await this.$auth.logout()
        this.$router.push('/')
      } catch (err) {
        console.log(err)
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
