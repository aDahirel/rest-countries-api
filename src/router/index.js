import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Country from "../components/Country.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
  },
  {
    path: "/:name",
    name: "country",
    component: Country,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
