<template>
  <table>
    <!-- Table caption -->
    <caption>Humans</caption>

    <!-- column headers -->
    <thead>
      <tr>
        <th>№</th>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Action</th>
      </tr>
    </thead>
    
    <!-- *** Table body *** -->
    <tbody>
      <template v-for="(human, key) of humans" :key="key">
        <tr>
          <td>{{ (page - 1) * pageItemsCount + key+1 }}</td>
          <td>{{ human._id }}</td>
          <td>{{ human.name }}</td>
          <td>{{ human.age }}</td>
          <td :index="key">
            <button @click="update">Update</button>
            <button @click="localDelete">Delete</button>
          </td>
        </tr>
      </template>
    </tbody>
    <!-- *** *** *** -->

  </table>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'HumansTable',
  computed: {
    ...mapGetters('humans', ['page', 'pageItemsCount', 'humans'])
  },
  methods: {
    ...mapMutations('humans', ['startUpdate']),
    ...mapActions('humans', ['delete']),
    update(e) {
      const index = parseInt(e.target.parentNode.getAttribute('index'))
      this.startUpdate(index)
    },
    localDelete(e) {
      const index = e.target.parentNode.getAttribute('index')
      this.delete(index)
    },
  }
}
</script>

<style scoped>
</style>