<template>
  <form>
    <title>Фильтр выдачи</title>
    <input type="text" v-model="testToSearch" @input="onChanged" />
  </form>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";

@Component
export default class Search extends Vue {
  testToSearch = "";

  @Emit()
  onChanged(event: Event) {
    return (event.target as HTMLInputElement).value;
  }
}
</script>

<style lang="scss" scoped></style>
