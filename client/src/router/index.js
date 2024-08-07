import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Explore/Home.vue";
import Register from "../views/Landing/Register.vue";
import Login from "../views/Landing/Login.vue";
import Explore from "../layouts/Explore.vue";
import Landing from "../layouts/Landing.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: Landing,
    children: [
      {
        // path = /register
        path: "/register",
        name: "Register",
        component: Register
      },
      {
        // path = /login
        path: "/login",
        name: "Login",
        component: Login
      },
    ],
  },
  {
    path: "/explore",
    name: "explore",
    component: Explore,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
