<template>
  <div 
    v-if="person"
    class="tree-node major-visible-node"
    :data-id="person.id"
    :class="{padding: !person.fellow}"
  >
    <div v-if="person.fellow" class="wing"></div>
    <individual 
      :data="person"
    ></individual>
    <template class="fellow-wrapper wing" v-if="person.fellow">
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
  },
}
</script>

<style lang="less" scoped>
@line: 2px solid #ddd;
@pad: 15px;
.tree-node {
  display: flex;
  position: relative;
  justify-content: center;
  padding: @pad 0 5px;
  &.padding {
    padding: @pad;
  }
}

.dash {
  width: 5px;
  height: 25px;
  border-bottom: @line;
}

.wing {
  width: 60px;
}
</style>
