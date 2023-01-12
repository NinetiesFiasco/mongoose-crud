<template>
  <article>
    <section>
      <humans-table />
    </section>

    <!-- *** Pagination *** -->
    <section>
      <humans-pagination />
    </section>
    <!-- *** *** *** -->

    <section>
      <human-editor />
    </section>

  </article>
</template>

<script>
import {mapActions} from 'vuex'
import HumansTable from './HumansTable.vue'
import HumansPagination from './HumansPagination.vue'
import HumanEditor from './HumanEditor.vue'

export default {
  name: 'Crud',

  components: {HumansTable, HumansPagination, HumanEditor},
  
  mounted() {
    this.readPage();
  },
  
  methods: {
    ...mapActions('humans', ['readPage']),
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