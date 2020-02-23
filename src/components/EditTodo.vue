<template>
  <div>
    <form v-on:submit.prevent="updateTodoText">
      <div class="form-group">
        <label for="todoTitle"> Input todo </label><br>
        <input v-model="taskEditText" type="text" class="form-control">
        <label for="todoTitle" class="form-text text-muted"><small>* Required</small></label><br>
      </div>
      <div class="form-group">
        <label for="todoTitle"> Description </label><br>
        <input v-model="descriptionEditText" type="text" class="form-control"><br>
      </div>
      <button type="button" class="btn btn-primary">
        Cancel </button>&nbsp;
      <router-link to="/">
    <button type="submit" class="btn btn-primary" v-on:click="updateTodoText()">
      Save </button>
    </router-link>
    </form>
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
      item: {
        task: '',
        description: ''
      },
      todoId: '',
      newTask: '',
      newDescription: '',
      currentlyEditing: null,
      taskEditText: '',
      descriptionEditText: '',
      emptySave: false
    }
  },
  created: function () {
    this.getTodo()
  },
  methods: {
    getTodo () {
      this.currentlyEditing = this.$route.params.id
      this.taskEditText = this.$route.params.task
      this.descriptionEditText = this.$route.params.description
    },
    updateTodoText () {
      db.collection('todos').doc(this.$route.params.id).update({
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
    }

  }

}

</script>

<style>

</style>
