<template>
  <div v-if="person" class="tree-node">
    <individual :data="person"></individual>
    <!-- <template class="fellow-wrapper" v-if="person.fellow">
      <individual :data="person.fellow"></individual>
    </template> -->
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
.tree-node {
  display: flex;
  justify-content: center;
  margin: auto;
}
</style>
