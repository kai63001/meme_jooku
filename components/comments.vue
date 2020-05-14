<template>
  <div class="pt-3">
    <div class="text-center">
      {{ msg }} ยังไม่ได้ทำ
    </div>
  </div>
</template>
<script>
export default {
  name: 'Comments',
  // eslint-disable-next-line vue/require-prop-types
  props: ['msg']
}
</script>
<style>
</style>
