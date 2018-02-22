<template>
  <div class="individual">
    <div
      :data-id="personData.id"
      class="head"
      :class="personData.isMale ? 'male' : 'female'"
    >
      {{personData.firstname}}
    </div>
    <div class="name">
      {{personData.lastname}}
    </div>
  </div>
</template>

<script>
import IPA from 'ipa.js';

const ipa = new IPA({
  firstname: String,
  lastname: String, 
});

export default {
  name: 'individual',
  props: ['data'],
  computed: {
    personData() {
      return ipa.guarantee(this.data, false);
    },
  },
}
</script>

<style lang="less" scoped>
  .individual {
    text-align: center;
    padding: 0 5px;
  }

  .head {
    box-sizing: border-box;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: auto;
    color: white;
    font-weight: bolder;
    padding-top: 18px;
    cursor: pointer;
  }

  .male {
    background: #277ceb;
  }

  .female {
    background: #f34268;
  }

  .name {
    text-decoration: underline;
    line-height: 30px;
  }
</style>
