<template>
  <ul class="patient-list">
    <li v-for="(item, k) in 20" :key="k" class="patient-list__item">{{ item }}</li>
  </ul>
</template>

<script>
export default {
  setup() {}
}
</script>

<style lang="scss">
.patient-list {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 330px;
  margin: 0;
}

.patient-list__item {
  display: flex;
  justify-content: center;
  align-items: center;

  @include themed;
  @include themeify {
    background-color: theme('color-background');
  }
}
</style>
