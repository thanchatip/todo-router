<template>
  <div>
    <form v-on:submit.prevent="updateTodoText">
      <div v-if="emptyEdit" class="alert alert-danger" role="alert">
        Please Enter Todo !!!
      </div>
      <div class="form-group">
        <label for="todoTitle"> Input todo </label><br>
        <input v-model="taskEditText" v-on:click="emptyEdit = false" type="text" class="form-control">
        <label for="todoTitle" class="form-text text-muted"><small>* Required</small></label><br>
      </div>
      <div class="form-group">
        <label for="todoTitle"> Description </label><br>
        <input v-model="descriptionEditText" type="text" class="form-control"><br>
      </div>
      <router-link to="/">
      <button type="button" class="btn btn-primary">
        Cancel </button>
        </router-link>&nbsp;
    <button type="submit" class="btn btn-primary">
      Save </button>
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
      todoId: '',
      newTask: '',
      newDescription: '',
      currentlyEditing: null,
      taskEditText: '',
      descriptionEditText: '',
      emptyEdit: false
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
      if (this.taskEditText.trim().length !== 0) {
        db.collection('todos').doc(this.$route.params.id).update({
          task: this.taskEditText,
          description: this.descriptionEditText
        }).then(
          console.log((this.taskEditText.trim().length)),
          this.currentlyEditing = null,
          this.taskEditText = '',
          this.descriptionEditText = '',
          console.log('saved !!'),
          this.$router.push({ path: '/' }))
      } else {
        console.log('empty')
        this.emptyEdit = true
      }
    }
  }

}

</script>

<style>

</style>
