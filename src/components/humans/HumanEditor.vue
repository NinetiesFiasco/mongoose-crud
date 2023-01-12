<template>
  <div>
    <h3>Editor</h3>
    <div>
      Human name <input v-model="edited.name" />
      Human age <input v-model="edited.age" />
    </div>
    <div>
      <button @click="refresh">Cancel</button>
      <button @click="save">OK</button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: 'HumanEditor',
  computed: {
    ...mapGetters('humans', ['edited'])
  },
  methods: {
    ...mapMutations('humans', ['refresh']),
    ...mapActions('humans', ['save']),
  }
}
</script>

<style scoped>
</style>