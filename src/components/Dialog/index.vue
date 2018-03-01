<template>
  <div class="mask" @click="closeMask">
    <div class="dialog" @click.stop>
      <a class="btn btn-close" @click="closeMask">
        <i class="iconfont icon-cancel"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'dialog-handler',
  computed: {
    ...mapState([
      'dialogAction',
    ])
  },
  methods: {
    ...mapMutations([
      'closeMask',
    ])
  }
}
    
</script>

<style lang="less" scoped>
.mask {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #0005;
  z-index: 10;
}
.dialog {
  position: relative;
  top: -100px;
  width: 400px;
  height: 200px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 6px #3335;
}
.btn-close {
  position: absolute;
  top: 5px;
  left: -5px;
  color: silver;
}
</style>
