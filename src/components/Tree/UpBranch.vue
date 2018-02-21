<template>
  <div>

  </div>
</template>

<script>
import IPA from 'ipa.js';

export default {
  name: 'up-branch',
  props: {
    person: {
      type: Object,
      default: () => ({}),
    },
    isPater: {
      type: Boolean,
      default: true,
    },
    layer: {
      type: Number,
    }
  },
}
</script>