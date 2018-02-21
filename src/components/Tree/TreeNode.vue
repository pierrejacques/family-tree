<template>
  <div v-if="person" class="node-wrapper">
    <individual :data="person"></individual>
    <span class="fellow-wrapper" v-if="person.fellow">
      -------
      <individual :data="person.fellow"></individual>
    </span>
  </div>
</template>

<script>
import Individual from '@/shared/Individual';

export default {
  name: 'tree-node',
  props: ['person'],
  components: {
    individual: Individual,
  }
}
</script>

<style scoped>
.node-wrapper {
  text-align: center;
}
</style>
