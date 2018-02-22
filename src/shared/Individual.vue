<template>
  <div class="individual">
    <div 
      class="head"
      :class="personData.isMale ? 'male' : 'female'"
    ></div>
    {{personData.firstname}} {{personData.lastname}}
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
  }
}
</script>

<style scoped>
  .individual {
    text-align: center;
  }

  .head {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #949494;
    margin: auto;
  }

  .male {
    background: #a5eeea;
  }

  .female {
    background: #eb6b95;
  }
</style>
