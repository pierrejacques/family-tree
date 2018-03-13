<template>
  <div class="tooltip" 
    :class="{ 
      [position]: true,
      'show': show
    }"
    >
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'tooltip',
    props: {
        position: {
            type: String,
            default: 'left',
        },
        show: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style lang="less" scoped>
@bg: #666;
@border: none;
@txt-color: #fff;
@size: 7px;

.tooltip {
    display: none;
    position: absolute;
    left: 100% + 20px;
    top: 50%;
    width: 6em;
    word-break: break-all;
    text-align: center;
    background: @bg;
    line-height: 1.2em;
    border-radius: 3px;
    padding: 5px 8px;
    border: @border;
    color: @txt-color;
    font-size: 12px;
    opacity: 0.9;
    &.bottom {
        left: 0;
        top: 100% + 15px;
        width: 3em;
        &::before {
            transform: rotate(45deg);
            top: -@size / 1.7 + 1px;
            left: 50% - @size / 1.4 * 0.5;
        }
    }
    &::before {
        content: '';
        position: absolute;
        box-sizing: border-box;
        z-index: 11;
        background: @bg;
        border-top: @border;
        border-left: @border;
        width: @size;
        height: @size;
        left: -@size / 1.7 + 1px;
        top: 50% - @size / 1.4 * 0.5;
        transform: rotate(-45deg);
    }
}
:hover > .tooltip,
.show {
    display: inline-block;
    z-index: 10;
}
</style>
