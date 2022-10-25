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
              <template v-for="(cell, key) of row" :key="key">
                <td>{{cell}}</td>
              </template>
              <td :index="key">
                <button @click="update">Update</button>
                <button @click="_delete">Delete</button>
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
export default {

  name: 'Crud',
  
  data() {
    return {
      edited: this.getEmpty(),
      columns: ['head 1'],
      crudData: [
        {stringValue: 'data 1'},
        {stringValue: 'data 2'}
      ],
      editedIndex: -1
    }
  },
  
  methods: {
    
    getEmpty: () => ({
      stringValue: ''
    }),
    
    refresh() {
      this.edited = this.getEmpty()
      this.editedIndex = -1
    },
    
    save() {
      if(this.editedIndex === -1) 
        this.crudData.push({
          ...this.edited
        })
      else
        this.crudData[this.editedIndex] = {...this.edited}
        
      this.refresh()
    },

    update(e) {
      const index = e.target.parentNode.getAttribute('index')
      this.editedIndex = parseInt(index)
      this.edited = {...this.crudData[this.editedIndex]}
    },

    _delete(e) {
      const index = e.target.parentNode.getAttribute('index')
      this.crudData.splice(index, 1)
    }

  }

}
</script>

<style scoped>
</style>
