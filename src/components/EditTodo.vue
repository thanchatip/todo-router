<template>
  <div>
    <form v-on:submit.prevent="updateTodo">
      <div class="form-group">
        <label for="todoTitle"> Input todo </label><br>
        <input v-model="item.task" type="text" class="form-control">
        <label for="todoTitle" class="form-text text-muted"><small>* Required</small></label><br>
      </div>
      <div class="form-group">
        <label for="todoTitle"> Description </label><br>
        <input v-model="item.description" type="text" class="form-control"><br>
      </div>
      <button type="button" class="btn btn-primary">
        Cancel </button>&nbsp;
      <input type="submit" class="btn btn-primary" value="Save" />
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
      var docRef = db.collection('todos').doc(this.currentlyEditing)
      docRef.get().then(function (doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data())
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      }).catch(function (error) {
        console.log('Error getting document:', error)
      })
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
    }

  }

}

</script>

<style>

</style>
