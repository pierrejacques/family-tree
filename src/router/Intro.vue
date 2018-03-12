<template>
  <main class="intro-page">
    <introduction class="introduction"></introduction>
    <div class="form form-style">
      <h3 class="state-title">{{isLogging ? '登陆已有账户' : '新用户注册'}}</h3>
      <login-form v-if="isLogging"></login-form>
      <regist-form v-else></regist-form>
      <div class="state-trigger" >
        <a class="pointer" @click.stop="triggerState()">{{isLogging ? '新用户注册' : '登陆已有账户'}}</a>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import Introduction from '@/components/Intro/Introduction';
import Login from '@/components/Intro/Login';
import Regist from '@/components/Intro/Regist';

export default {
  name: 'intro',
  components: {
    introduction: Introduction,
    'login-form': Login,
    'regist-form': Regist,
  },
  data() {
    return {
      isLogging: false,
    }
  },
  computed: {
  ...mapState([
      'userInfo',
  ])
  },
  created() {
    if (this.userInfo && this.userInfo.loggedIn === true) {
          this.$router.push({ name: 'Mytree' });
      }
  },
  methods: {
    triggerState() {
      this.isLogging = !this.isLogging;
    }
  }
}
</script>

<style lang="less">
.intro-page {
  display: flex;
  align-items: flex-start;
  padding: 50px 100px;
  min-height: 100vh;
  background: #2e4057;
  .introduction {
    flex-grow: 1;
  }
  .form {
    position: relative;
    box-sizing: border-box;
    width: 350px;
    padding: 15px 25px;
    background: white;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 2px 4px #0006;
    .state-title {
      margin-top: 35px;
    }
    .state-trigger {
      color: #4e6eff;
      padding: 20px 0;
      border-top: 1px solid #eee;
    }
  }
  .form-style {
    text-align: center;
    input {
      width: 100%;
      line-height: 32px;
      font-size: 16px;
      border: 1px solid #ccc;
      margin: 10px 0;
      text-indent: .5em;
      border-radius: 3px;
      font-weight: lighter;
    }
    input[type=submit] {
      @valid-color: #2bc538;
      border: none;
      margin: 30px 0 20px;
      background: @valid-color;
      border-color: @valid-color;
      color: white;
      font-weight: normal;
    }
  }
  .pointer {
    cursor: pointer;
  }
}
</style>
