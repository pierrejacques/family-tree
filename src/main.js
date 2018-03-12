// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (store.state.userInfo === null) { // 登录信息未知
    axios.get('api/userinfo').then(
      res => {
        store.commit('setLogin', res.data.data);
        const current = router.currentRoute.path;
        if (res.data.data && res.data.data.loggedIn === false) {
          next('/');
        } else {
          next();
        }
      },
      err => {
        next();
      }
    );
    return;
  }
  if (store.state.userInfo.loggedIn === false && to.path !== '/') {
    next('/'); // 未登录要去其他页面
    return;
  }
  if (store.state.userInfo.loggedIn === true && to.path === '/') {
    next('/mytree'); // 登陆了要去登陆页
    return;
  }
  next(); // 没毛病
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

