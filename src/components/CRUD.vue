<template>
  <article>
    <section>
      <table>
        <!-- Table caption -->
        <caption>CRUD</caption>

        <!-- column headers -->
        <thead>
          <tr>
            <th>ID</th>
            <template v-for="(row, key) of columns" :key="key">
              <th>{{row}}</th>
            </template>
            <th>Action</th>
          </tr>
        </thead>
        
        <!-- *** Table body *** -->
        <tbody>
          <template v-for="(row, key) of crudData" :key="key">
            <tr>
              <td>{{key+1}}</td>
              <template v-for="(cell, key2) of row" :key="key2">
                <td>{{cell}}</td>
              </template>
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
    ...mapGetters('crud', ['edited','columns','crudData'])
  },
  
  methods: {
    ...mapMutations('crud', ['refresh', 'startUpdate', '_delete']),
    ...mapActions('crud', ['save']),
    

    update(e) {
      const index = parseInt(e.target.parentNode.getAttribute('index'))
      this.startUpdate(index)
    },

    localDelete(e) {
      const index = e.target.parentNode.getAttribute('index')
      this._delete(index)
    }

  }

}
</script>

<style scoped>
</style>
