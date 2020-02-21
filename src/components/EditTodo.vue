<template>
  <div>
    <div class="form-group">
      <label for="todoTitle"> Input todo </label><br>
      <input v-model="taskEditText" type="text" class="form-control">
      <label for="todoTitle" class="form-text text-muted"><small>* Required</small></label><br>
    </div>
    <div class="form-group">
      <label for="todoTitle"> Description </label><br>
      <input v-model="descriptionEditText" type="text" class="form-control"><br>
    </div>
    <button type="button" class="btn btn-primary" v-on:click="loadTodo(), showCreate = false , showTodo = true">
      Cancel </button>&nbsp;
    <button type="button" class="btn btn-primary" v-on:click="updateTodoText(), showEdit = false , showTodo = true">
      Save </button>
  </div>
</template>
<!--firebase config-->
<script>

import '@firebase/firestore'
import db from '../firestore'

export default {
  name: 'Edit',
  data () {
    return {
      todos: [],
      newTask: '',
      newDescription: '',
      removeTask: '',
      showTodo: true,
      showCreate: false,
      showEdit: false,
      isEmpty: false,
      currentlyEditing: null,
      taskEditText: '',
      descriptionEditText: '',
      emptySave: false
    }
  },
  methods: {
    editTodo (todo) {
      this.currentlyEditing = todo.id
      this.taskEditText = todo.task
      this.descriptionEditText = todo.description
    },
    updateTodoText () {
      db.collection('todos').doc(this.currentlyEditing).update({
        task: this.taskEditText,
        description: this.descriptionEditText
      }).then(function (doc) {
        console.log('Updated !!!')
      })
        .catch(function (error) {
          console.error('Error updating document text: ', error)
        })
      this.currentlyEditing = null
      this.todoEditText = ''
      this.loadTodo()
    }

  }

}

</script>

<style>

</style>
