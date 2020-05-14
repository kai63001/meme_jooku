<template>
  <div class="pt-3">
    <div class="">
      <div v-for="(c,i) in comments" :key="i" class="row">
        <div class="col-md-2">
          {{ c.m_name }}
        </div>
        <div class="col-md-10">
          {{ c.c_comment }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Comments',
  // eslint-disable-next-line vue/require-prop-types
  props: ['msg'],
  data () {
    return {
      comments: this.msg
    }
  },
  async created () {
    const dataComment = await this.$axios.get(`/comment/${this.msg}`)
    this.comments = dataComment.data
  },
  methods: {
    text () {
      this.comments = '5555'
    }
  }
}
</script>
<style>
</style>
