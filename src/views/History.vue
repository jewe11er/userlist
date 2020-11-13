<template>
  <div>
    <router-link to="/">Назад</router-link>
    <div class="row bold">
      <span>ID:</span>
      <span>Name:</span>
      <span>Change time:</span>
      <span>Action:</span>
    </div>
    <div v-for="item in list" :key="item.time" class="row">
      <span>{{ item.id }}</span>
      <span>{{ item.name }}</span>
      <span>{{ item.time }}</span>
      <span>{{ item.action }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { userStoryList } from "@/store/story";
import { IUser } from "@/types";
import { Route, RawLocation } from "vue-router";

Component.registerHooks(["beforeRouteEnter"]);

@Component
export default class History extends Vue {
  list: IUser[] = [];

  beforeRouteEnter(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: any) => any) | void) => void
  ): void {
    console.log(to);
    // this.list = userStoryList.getFullList;
    next(vm => {
      if (to.query.type === "add") {
        vm.list = userStoryList.getAddList;
      } else if (to.query.type === "remove") {
        vm.list = userStoryList.getRemoveList;
      } else {
        vm.list = userStoryList.getFullList;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: grid;
  grid-template-columns: 50px 1fr 0.7fr 100px;
  padding: 5px 0;
  border-bottom: 1px solid black;
  &.bold {
    font-weight: 600;
  }
}
</style>
