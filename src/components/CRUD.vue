<template>
  <article>
    <section>
      <table>
        <!-- Table caption -->
        <caption>CRUD</caption>

        <!-- column headers -->
        <thead>
          <tr>
            <th>№</th>
            <th>ID</th>
            <th>Data</th>
            <th>Action</th>
          </tr>
        </thead>
        
        <!-- *** Table body *** -->
        <tbody>
          <template v-for="(entry, key) of crudData" :key="key">
            <tr>
              <td>{{(localPage - 1) * localPageItemsCount + key+1}}</td>
              <td>{{entry._id}}</td>
              <td>{{entry.stringValue}}</td>
              <td :index="key">
                <button @click="update">Update</button>
                <button @click="localDelete">Delete</button>
              </td>
            </tr>
          </template>
        </tbody>
        <!-- *** *** *** -->

      </table>
    </section>

    <!-- *** Pagination *** -->
    <section>
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
    </section>
    <!-- *** *** *** -->

    <section>
      <h3>Editor</h3>
      <div>
        String value <input v-model="edited.stringValue" />
      </div>
      <div>
        <button @click="refresh">Cancel</button>
        <button @click="save">OK</button>
      </div>

    </section>

  </article>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'Crud',
  
  computed: {
    ...mapGetters('example', ['edited','crudData', 'count', 'page', 'pageItemsCount']),
    localPage: {
      get() {return this.page},
      set(value) {this.setPage(value)}
    },
    localPageItemsCount: {
      get() {return this.pageItemsCount},
      set(value) {this.setPageItemsCount(value)}
    },
    numberOfPages() {
      return Math.ceil(this.count / this.localPageItemsCount);
    }
  },

  mounted() {
    this.readPage();
  },
  
  methods: {
    ...mapMutations('example', ['refresh', 'startUpdate']),
    ...mapActions('example', ['save', 'read', 'delete', 'generate', 'setPageItemsCount', 'readPage', 'setPage']),

    update(e) {
      const index = parseInt(e.target.parentNode.getAttribute('index'))
      this.startUpdate(index)
    },

    localDelete(e) {
      const index = e.target.parentNode.getAttribute('index')
      this.delete(index)
    },
    generate10() {this.generate(10)},
    generate20() {this.generate(20)},
    generate30() {this.generate(30)},
    localSetPage(e) {
      this.setPage(e.target.getAttribute('page'));
    }

  }
}
</script>

<style scoped>
.pages > span{
  color: blue;
  text-decoration: underline;
  display: inline-block;
  padding: 3px;
  margin: 0px 5px;
  cursor: pointer;
  user-select: none;
}
.pages > span:hover{
  color: darkblue;
}
.pages > span:active{
  color:red;
}
.pages > span.selected {
  outline: 1px solid blue;
}
</style>