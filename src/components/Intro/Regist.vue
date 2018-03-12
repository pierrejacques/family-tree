<template>
  <div class="regist">
    <form @submit.stop="submit">
      <input type="text" placeholder="请输入用户名" @input="checkUsername" v-model="username">
      <input type="text" placeholder="请输入昵称" v-model="nickname">
      <input type="password" placeholder="请输入密码" v-model="password">
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
      nickname: '',
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
        nickname: this.nickname,
      }).then(
        res => {
          this.msg = res.data.msg;
          if (res.data.success) {
            location.reload();
          }
        },
        error => {},
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
