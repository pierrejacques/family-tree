import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home/Home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: Home,
      path: '/',
      component: Home,
    },
  ],
});
