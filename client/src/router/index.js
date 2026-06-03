const Login =
() => import('../pages/Login.vue')

const Register =
() => import('../pages/Register.vue')
const ProductDetail =
() => import('../pages/ProductDetail.vue')
import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue')
const Cart = () => import('../pages/Cart.vue')

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
  path:'/product/:id',
  component:ProductDetail
  },
  {
  path:'/login',
  component:Login
  },
  {
    path:'/register',
    component:Register
  },
  {
  path: '/checkout',
  component: () => import('../pages/Checkout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router