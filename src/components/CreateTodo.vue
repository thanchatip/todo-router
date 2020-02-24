<template>
  <div>
    <form v-on:submit.prevent="saveTodo">
      <div v-if="emptySave" class="alert alert-danger" role="alert">
        Please Enter Todo !!!
      </div>
      <div class="form-group">
        <label for="todoTitle"> Input todo </label><br>
        <input v-model="newTask" v-on:click="emptySave = false" type="text" class="form-control">
        <label for="todoTitle" class="form-text text-muted"><small>* Required</small></label><br>
      </div>
      <div class="form-group">
        <label for="todoTitle"> Description </label><br>
        <input v-model="newDescription"  type="text" class="form-control"><br>
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
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-firestore.js"></script>

<script>
  import {
    firebase
  } from "@firebase/app";
  import "@firebase/firestore";
  import db from '../firestore'

  export default {
    name: 'Create',
    data() {
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
        emptySave: false
      }
    },
    firestore() {
      return {
        todos: db.collection('todos')
      }
    },
    methods: {
      saveTodo() {
        if (this.newTask.trim().length!== 0) {
          db.collection('todos').add({
            task: this.newTask,
            description: this.newDescription
          }).then(console.log((this.newTask.trim().length)),this.newTask = '', this.newDescription = '',console.log('saved !!'),this.$router.push({path:'/'}))
        }else{
          console.log("empty")
          return this.emptySave = true
        }
      }
    }
  }
</script>

<style>
  @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 20px;
  }

</style>
