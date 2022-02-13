import Vue from "vue";
import GameFinder from "./fumbbl/pages/gamefinder/GameFinder.vue";

Vue.config.productionTip = false

new Vue({
  render: h => h(GameFinder),
}).$mount('#vuecontent')