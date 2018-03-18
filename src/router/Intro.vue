<template>
  <main class="intro-page">
    <div class="form form-style">
      <h3 class="state-title">{{isLogging ? '登陆已有账户' : '新用户注册'}}</h3>
      <login-form v-if="isLogging"></login-form>
      <regist-form v-else></regist-form>
      <div class="state-trigger" >
        <a class="pointer" @click.stop="triggerState()">{{isLogging ? '新用户注册' : '登陆已有账户'}}</a>
      </div>
    </div>
    <h1 class="main-title title">「 同堂 」</h1>
    <h2 class="sub-title title">家谱构建&分享平台</h2>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import Login from '@/components/Intro/Login';
import Regist from '@/components/Intro/Regist';

export default {
  name: 'intro',
  components: {
    'login-form': Login,
    'regist-form': Regist,
  },
  data() {
    return {
      isLogging: true,
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
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 0 100px;
  min-height: 100vh;
  background: url(../asset/img/familytree.png), #eee;
  background-repeat: no-repeat;
  background-size: 700px;
  background-position: 10vw;
  .form {
    // position: relative;
    box-sizing: border-box;
    width: 370px;
    padding: 15px 25px;
    background: white;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 2px 4px #0001;
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
      margin: 12px 0;
      text-indent: .5em;
      border-radius: 3px;
      font-weight: light;
    }
    input[type=submit] {
      @valid-color: #2bc538;
      border: none;
      margin: 30px 0 20px;
      background: @valid-color;
      border-color: @valid-color;
      color: white;
      font-weight: normal;
      &.disabled { cursor: not-allowed; }
    }
  }
  .pointer {
    cursor: pointer;
  }
  .warn {
    position: relative;
    height: 0;
    line-height: 0;
    padding: 0;
    margin: 0;
    font-size: 10px;
    text-align: left;
    color: red;
  }
  .title {
    font-family: serif;
    color: white;
    margin: 0;
    color: #485386;
    text-shadow: 0 0 2px white;
  }
  .main-title {
    font-size: 2em;
    font-weight: 800;
    margin: 40px 0 10px;
  }
  .sub-title {

  }
}
</style>
