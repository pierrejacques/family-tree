// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

axios.get('api/userinfo').then(
  res => {
    store.commit('setLogin', res.data.data);
    const current = router.currentRoute.path;
    if (res.data.data && res.data.data.loggedIn === false) {
      router.push({ name: 'Intro' });
    }
  },
  err => {
    throw new Error('请求错误');
  }
);