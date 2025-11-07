import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import Login from '../pages/Login.vue'
import MovieDetails from "../pages/MovieDetails.vue";
import Registro from "../pages/Registro.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/registro",
    name: "registro",
    component: Registro,
  },
  {
    path: "/movie/:movie",
    name: "movieDetails",
    component: MovieDetails,
  },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
})