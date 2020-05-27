<template>
  <div>
    <navbar />
    <div class="row">
      <leftmenu />
      <div class="col-md-9 pr-md-5 pl-md-0 pl-4">
        <br>
        <br>
        <br>
        <profile />
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '~/components/navbar'
import leftmenu from '~/components/leftmenu'
import profile from '~/components/user/profile'
export default {
  name: 'Profile',
  components: {
    navbar, leftmenu, profile
  }
}
</script>
