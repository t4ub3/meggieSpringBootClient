import Vue from "vue";
import VueMq from "vue-mq";
import Vuelidate from "vuelidate";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGasPump,
  faTachometerAlt,
  faTable,
  faEuroSign,
  faPlus,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { router } from "./router";
import App from "./App.vue";

library.add(
  faGasPump,
  faTachometerAlt,
  faTable,
  faEuroSign,
  faPlus,
  faDollarSign
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueMq, {
  breakpoints: {
    sm: 800,
    lg: 1300
  }
});

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  validations: {},
  render: h => h(App)
}).$mount("#app");
