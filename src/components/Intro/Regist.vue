<template>
  <div class="regist">
    <form @submit.prevent="submit">
      <input type="text" placeholder="用户名" @input="checkUsername" v-model="username">
      <p v-if="username && !isValid" class="warn">用户名已被占用，请换一个名字</p>
      <input type="password" placeholder="密码" v-model="password">
      <p v-if="password && !passwordValid" class="warn">密码至少8位</p>
      <input type="password" placeholder="再次输入密码" v-model="duplicate">
      <p v-if="password && duplicate && password !== duplicate" class="warn">两次输入的密码必须一致</p>
      <input type="submit" class="pointer" value="注册" :class="{ disabled: !submittable }">
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
      duplicate: '',
      msg: '',
      isValid: true,
    }
  },
  computed: {
    passwordValid() {
      return this.password.length >= 8;
    },
    submittable() {
      return this.username && this.password && this.isValid && this.password === this.duplicate && this.passwordValid;
    },
  },
  methods: {
    submit() {
      if (!this.submittable) return;
      axios.post('/api/regist', {
        username: this.username,
        password: this.password,
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
      axios.get('/api/checkusername', {
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
