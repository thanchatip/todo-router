import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../components/Todolist.vue'
import Create from '../components/CreateTodo.vue'
import Edit from '../components/EditTodo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
  }
]

const router = new VueRouter({
  routes
})

export default router
