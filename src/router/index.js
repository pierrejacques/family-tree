import Vue from 'vue';
import Router from 'vue-router';
import Mytree from './Mytree';
import Intro from './Intro';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro,
    },
    {
      path: '/mytree',
      name: 'Mytree',
      component: Mytree,
    },
  ],
});
