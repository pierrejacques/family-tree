<template>
  <div class="hello">
    <form @submit.stop="submit">
      <input type="text" v-model="username">
      <input type="password" v-model="password">
      <input type="submit" class="pointer">
    </form>
  </div>
</template>

<script>
import axios from 'axios';

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
    submit() {
      if (!this.submittable) return;
      axios.post('api/login', {
        username: this.username,
        password: this.password,
      }).then(
        res => {
          if (res.data.isValid) {
            this.$router.push({ name: 'Mytree' }); // TODO: 登陆成功后的逻辑
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
