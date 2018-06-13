<template>
  <div class="hello">
    <form @submit.prevent="submit">
      <input type="text" v-model="username" placeholder="用户名">
      <input current-password type="password" placeholder="密码" v-model="password">
      <p v-if="msg" class="warn" :class="{ normal: !warn }">{{msg}}</p>
      <input type="submit" class="pointer" value="登陆" :class="{ disabled: !submittable }">
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      msg: '',
      warn: false,
    }
  },
  computed: {
    submittable() {
      return !!this.username && !!this.password;
    },
  },
  methods: {
    ...mapMutations([
      'setLogin',
    ]),
    submit() {
      if (!this.submittable) return;
      this.msg = '';
      this.warn = false;
      axios.post('/api/login', {
        username: this.username,
        password: this.password,
      }).then(
        res => {
          if (res.data.isValid) {
            this.setLogin({
              username: this.username,
              loggedIn: true,
            });
            location.reload();
            this.msg = '登陆成功';
            this.warn = false;
          } else {
            this.msg = '';
            this.warn = true;
          }
        },
        error => {
          this.msg = '对不起，服务错误！';
          this.warn = true;
        }
      )
    },
  }
}
</script>

<style scoped>
.normal {
  color: #447fff;
}
</style>
