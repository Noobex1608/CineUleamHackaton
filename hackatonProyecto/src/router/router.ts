import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../composables/useAuth";

import HomePage from "../pages/HomePage.vue";
import Login from "../pages/Login.vue";
import MovieDetails from "../pages/MovieDetails.vue";
import Registro from "../pages/Registro.vue";
import Reserve from "../pages/Reserve.vue";

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
  {
    path: "/reserve/:movie",
    name: "Reserve",
    component: Reserve,
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../pages/Admin.vue"),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard para proteger rutas
router.beforeEach((to, _from, next) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/login');
  } else if (to.meta.requiresAdmin && !isAdmin.value) {
    next('/'); // Redirigir al home si no es admin
  } else {
    next();
  }
});
