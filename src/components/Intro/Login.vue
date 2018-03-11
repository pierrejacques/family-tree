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
      msg: '',
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
          this.msg = res.data.msg
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
