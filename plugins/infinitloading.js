import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(InfiniteLoading, {
  props: {
    spinner: 'spiral'
  },
  system: {
    throttleLimit: 50
  },
  slots: {
    noMore: 'No more meme'
  }
})
