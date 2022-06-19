import { createWebHistory, createRouter } from 'vue-router'
import CreateBlog from '../components/blog/CreateBlog.vue'
import ListBlogs from '../components/blog/ListBlogs.vue'
import HelloWorld from '../components/HelloWorld.vue'
import RegisterUser from '../components/register/RegisterUser'
const routes = [
  {
    path: '/',

    component: HelloWorld,
  },
  {
    path: '/create-blog',

    component: CreateBlog,
  },
  {
    path: '/blogs',

    component: ListBlogs,
  },
  {
    path: '/register',

    component: RegisterUser,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
