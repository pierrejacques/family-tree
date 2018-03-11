<template>
  <div class="regist">
    <form @submit.stop="submit">
      <input type="text" @input="checkUsername" v-model="username">
      <input type="password" v-model="password">
      <input type="submit" class="pointer">
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'regist',
  data() {
    return {
      username: '',
      password: '',
      msg: '',
      isValid: false,
    }
  },
  computed: {
    submittable() {
      return !!this.username && !!this.password && this.isValid;
    },
  },
  methods: {
    submit() {
      if (!this.submittable) return;
      axios.post('api/regist', {
        username: this.username,
        password: this.password,
      }).then(
        res => {
          this.msg = res.data.msg; // TODO: 注册成功后的逻辑
        },
        error => {
          
        }
      )
    },
    checkUsername() {
      if (!this.username) {
        this.isValid = false;
        return;
      }
      axios.get('api/checkusername', {
        params: {
          username: this.username,
        },
      }).then(
        res => {
          this.isValid = res.data.isValid;
        },
        error => {

        }
      )
    }
  }
}
</script>

<style scoped>
</style>
