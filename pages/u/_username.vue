<template>
  <div>
    <navbar />
    <div class="row">
      <leftmenu />
    </div>
  </div>
</template>

<script>
import navbar from '~/components/navbar'
import leftmenu from '~/components/leftmenu'
export default {
  name: 'Profile',
  components: {
    navbar, leftmenu
  }
}
</script>
