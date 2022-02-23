import Main from "layouts/MainLayout.vue"
import Home from "pages/Home.vue"

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
    ],
  },
  
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
]

export default routes
