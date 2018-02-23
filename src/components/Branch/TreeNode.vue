<template>
  <div v-if="person" class="tree-node">
    <individual 
      :data="person"
    ></individual>
    <template class="fellow-wrapper" v-if="person.fellow">
      <div class="dash"></div>
      <individual 
        :data="person.fellow" 
        :isMinor="true"
      ></individual>
    </template>
  </div>
</template>

<script>
import Individual from './Individual';

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
  margin: 20px 0;
}

.dash {
  height: 25px;
  width: 20px;
  border-bottom: 1px solid black;
}
</style>
