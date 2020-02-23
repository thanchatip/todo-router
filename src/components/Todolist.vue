<template>
  <div>
    <br>
    <div class="card mb-2" v-for="(todo , index) in todos" v-bind:key="todo.id">
      <div class="card-body">
        <h5 class="card-title">{{ todo.task }}</h5>
        <p class="card-text">{{ todo.description }}</p>
        <div class="row">
          <div class="col-auto mr-auto">
              <router-link :to="{name: 'Edit', params: { id: todo.id }}" class="btn btn-primary">Edit</router-link>
                &nbsp;
              <button
                  class="btn btn-danger" v-on:click="removeTodo(todo.id)"> Delete </button>&nbsp;
          </div>
          <div class="col-auto">
            <button v-if="index !== 0" type="button" class="btn btn-outline-info" v-on:click="moveUp(index)"> Up
            </button>&nbsp;
            <button v-if="index !== todos.length-1" type="button" class="btn btn-outline-info"
              v-on:click="moveDown(index)"> Down </button><br>
          <router-view/>
          </div>
        </div>
      </div>
    </div>
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
    name: 'List',
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
        descriptionEditText: '',
        emptySave: false
      }
    },
    firestore() {
      return {
        todos: db.collection('todos')
      }
    },
    mounted() {
      this.loadTodo();
    },
    methods: {
      editTodo(){
        let todoTask = this.todo.Task;
        this.$emit('editThisTodo',todoTask)
      },
      loadTodo() {
        let todolist = [];
        db.collection('todos').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let todo = {
              id: doc.id,
              task: doc.data().task,
              description: doc.data().description
            }
            todolist.push(todo)
          });
        });
        this.todos = todolist;
      },
      removeTodo(collectionID) {
        db.collection('todos').doc(collectionID).delete().then(function () {}).catch(function (error) {
          console.error("Error removing document: ", error);
        });
        this.loadTodo();
      },
      moveUp(index) {
        if (index === 0) {
          return
        }
        let todo = this.todos[index]
        this.todos.splice(index, 1)
        this.todos.splice(index - 1, 0, todo)
      },
      moveDown(index) {
        if (index == this.todos.length - 1) {
          return
        }
        let todo = this.todos[index]
        this.todos.splice(index, 1)
        this.todos.splice(index + 1, 0, todo)
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
