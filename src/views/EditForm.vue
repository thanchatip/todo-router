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
    <button type="button" class="btn btn-primary" v-on:click="updateTodoText(), showTodo = true">
      Save </button>
  </div>
</template>

<script>
export default {

}
</script>
