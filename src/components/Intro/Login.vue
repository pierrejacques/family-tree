<template>
  <div class="hello">
    <form @submit.stop="submit">
      <input type="text" v-model="username" placeholder="请输入">
      <input type="password" v-model="password">
      <input type="submit" class="pointer">
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
            this.$router.push({ name: 'Mytree' });
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
