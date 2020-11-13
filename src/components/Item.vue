<template>
  <li class="item">
    <span>{{ item.name }} works with {{ item.items.name }}</span>
    <div :class="`item__button ${btnType}`" @click="addElement(item)">
      <img :src="`/images/${btnType}.svg`" alt="" />
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

// interfaces
import { IUser } from "@/types";

@Component
export default class Item extends Vue {
  @Prop({ required: true }) readonly item: IUser | undefined;
  @Prop({ default: "plus" }) readonly btnType!: string;

  @Emit()
  addElement(item: IUser) {
    return item;
  }
}
</script>

<style lang="scss" scoped>
.item {
  list-style: none;
  padding: 10px 0;
  text-align: left;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:last-child {
    border-bottom: none;
  }
  &__button {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 5rem;
    border: 2px solid silver;
    cursor: pointer;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      object-position: center;
      object-fit: contain;
      height: 70%;
    }
  }
}
</style>
