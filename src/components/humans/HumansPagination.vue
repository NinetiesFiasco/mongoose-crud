<template>
  <div>
    <div class="pages">
        <template v-for="page of numberOfPages" :key="page">
          <span
            :page="page"
            :class="{
              selected: page === localPage
            }"
            @click="localSetPage"
          >{{page}}</span>
        </template>
      </div>

      Collection count: {{ count }}<br/>
      Page <input type="number" v-model="localPage" /><br/>
      Items per page <input type="number" v-model="localPageItemsCount" /><br />


      <button @click="generate10">Generate 10 words</button>
      <button @click="generate20">Generate 20 words</button>
      <button @click="generate30">Generate 30 words</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'HumansPagination',
  computed: {
    ...mapGetters('humans', ['count', 'page', 'pageItemsCount']),
    numberOfPages() {
      return Math.ceil(this.count / this.localPageItemsCount);
    },
    localPage: {
      get() {return this.page},
      set(value) {this.setPage(value)}
    },
    localPageItemsCount: {
      get() {return this.pageItemsCount},
      set(value) {this.setPageItemsCount(value)}
    }
  },
  methods: {
    ...mapActions('humans', ['generate', 'setPage', 'setPageItemsCount']),
    localSetPage(e) {
      this.setPage(e.target.getAttribute('page'));
    },
    generate10() {this.generate(10)},
    generate20() {this.generate(20)},
    generate30() {this.generate(30)},
  }
}
</script>

<style scoped>
</style>