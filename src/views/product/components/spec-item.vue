<template lang="pug">
  a.spec-item(:class="{'spec-item--active': active, 'spec-item--disabled': !active && disabled }" @click="handle()")
    slot
</template>

<script>
export default {
  name: 'SpecItem',
  inject: ['rootGroup'],
  props: {
    label: {
      type: [Number, String],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    active() {
      return this.rootGroup.current === this.label
    }
  },
  methods: {
    handle() {
      if (this.disabled && !this.active) return
      this.rootGroup.current = this.active ? '' : this.label
    }
  }
}
</script>

<style lang="scss">
.spec-item {
  width: 60px;
  line-height: 28px;
  text-align: center;
  background-color: var(--color-background-light);
  border: 1px solid var(--color-background-light-gray-1);
  border-radius: 4px;
  @extend %themed;

  &--disabled {
    cursor: not-allowed;
    background-color: var(--color-background-light-gray-1);
    border-color: var(--color-background-light-gray-2);
  }

  &--active {
    color: var(--color-text-regular-current);
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }
}
</style>
