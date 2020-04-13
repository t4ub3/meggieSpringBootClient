import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "./views/LoginView";
import MainView from "./views/MainView";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "main", component: MainView },
  { path: "/login", name: "login", component: LoginView }
];

export const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // try to access a restricted page + not logged in
  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});
