<template>
  <div class="hello">
    <form @submit.prevent="submit">
      <input type="text" v-model="username" placeholder="用户名">
      <input type="password" placeholder="密码" v-model="password">
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
      axios.post('api/login', {
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
          }
        },
        error => {
          
        }
      )
    },
  }
}
</script>

<style scoped>
</style>
