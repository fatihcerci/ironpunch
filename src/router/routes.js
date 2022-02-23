import Base from "layouts/BaseLayout.vue"
import Main from "layouts/MainLayout.vue"
import Home from "pages/Home.vue"
import Claim from "pages/Claim.vue"
import Detail from "pages/Detail.vue"
import UserLogin from "pages/UserLogin.vue"
import UserForgetPassword from "pages/UserForgetPassword.vue"
import Messages from "pages/Messages.vue"

const routes = [
  /*{
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Main,
    children: [
      {
        name: 'Home',
        path: '/home',
        component: Home
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/claim",
    component: Main,
    children: [
      {
        name: 'Clain',
        path: '/claim/:id',
        component: Claim
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    component: Main,
    children: [
      {
        name: 'UserLogin',
        path: '/auth',
        component: UserLogin
      },
    ],
    meta: { requiresAuth: false },
  },*/
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "",
        component: Home,
        meta: { requiresAuth: false },
      },
      {
        path: "/claim",
        component: Claim,
        meta: { requiresAuth: false },
      },
      {
        path: "/detail",
        component: Detail,
        meta: { requiresAuth: false },
      },
      {
        path: "/messages",
        component: Messages,
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/auth",
    component: Base,
    children: [
      {
        name: "UserLogin",
        path: "/auth",
        component: UserLogin,
      },
    ],
    meta: { requiresAuth: false },
  },
  {
    path: "/forgetpassword",
    component: Base,
    children: [
      {
        name: "UserForgetPassword",
        path: "/forgetpassword",
        component: UserForgetPassword,
      },
    ],
    meta: { requiresAuth: false },
  },
  
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
]

export default routes
