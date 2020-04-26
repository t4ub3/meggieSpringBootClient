import Vue from "vue";
import VueRouter from "vue-router";
import MeLoginView from "./views/me-login-view";
import MeMainView from "./views/me-main-view";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "main", component: MeMainView },
  { path: "/login", name: "login", component: MeLoginView }
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
