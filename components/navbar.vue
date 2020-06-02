<template>
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
              <nuxt-link :to="`/u/${$auth.user.m_username}`" class="dropdown-item pt-2 pb-2" type="button">
                <img
                  v-lazy-load
                  width="15%"
                  class="rounded-circle"
                  :data-src="$auth.user.m_image"
                  :alt="$auth.user.name"
                >
                <span class="pl-2">Guest</span>
              </nuxt-link>
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
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
<style scoped>
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
.bg-white {
  background: white;
}
</style>
