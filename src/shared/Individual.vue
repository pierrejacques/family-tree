<template>
  <span class="individual">
    {{personData.firstname}} {{personData.lastname}}
  </span>
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
</style>
