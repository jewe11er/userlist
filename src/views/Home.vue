<template>
  <main>
    <div class="col">
      <Search @on-changed="onInputSort($event)" />
      <div class="col__list">
        <ul>
          <Item
            v-for="item in filteredList"
            :key="item.id"
            :item="item"
            @add-element="addSelected(item, 'list')"
          />
        </ul>
      </div>
    </div>
    <div class="col">
      <div class="col__buttons">
        <router-link
          v-for="{ title, query } in buttons"
          :key="query"
          :to="{ name: 'history', query: { type: query } }"
          class="btn"
          >{{ title }}</router-link
        >
      </div>
      <div class="col__list">
        <ul>
          <Item
            v-for="item in selectedList"
            :key="item.id"
            :item="item"
            btnType="minus"
            @add-element="addSelected(item, 'selectedList')"
          />
        </ul>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";

import { userStoryList } from "@/store/story";
import { userStateList } from "@/store/list";

import Search from "@/components/Search.vue";
import Item from "@/components/Item.vue";
import Button from "@/components/Button.vue";

// interfaces
import { IUser, Links } from "@/types";

@Component({
  components: {
    Search,
    Item,
    Button
  }
})
export default class Home extends Vue {
  term = "";
  buttons: Links[] = [
    { title: "История", query: "full" },
    { title: "История добавлений", query: "add" },
    { title: "История удалений", query: "remove" }
  ];

  mounted() {
    userStateList.loadList();
  }

  onInputSort(e: string): void {
    this.term = e;
  }
  // альтернативный путь - не удалять элементы, а скрывать в столбце слева с помощью нового свойства hide и добавлять справа, а при удалении справа, менять значение свойства hide
  // в таком случае при возвращении все элементы будут на своих местах
  // рассматривал при возможном варианте с добавлением 1000+ записей
  addSelected(element: IUser, from: string): void {
    if (from === "list") {
      userStateList.setSelectedList(element);
      userStateList.delMainList(element.id);
    } else {
      userStateList.setMainList(element);
      userStateList.delSelectedList(element.id);
    }
    const time: string = moment().format("LLL");
    const action = from === "list" ? "Add" : "Remove";
    userStoryList.addToList({ ...element, action, time });
  }

  checkIncludes(el: string): boolean {
    return el.toLowerCase().includes(this.term.toLowerCase());
  }

  get filteredList(): Array<IUser> {
    const filteredList = this.list.filter(
      ({ id, name, items }) =>
        this.checkIncludes(name) || this.checkIncludes(items.name)
    );
    filteredList.forEach(el => {
      const arrayLength = (
        (el.name + el.items.name).match(new RegExp(this.term, "g")) || []
      ).length;
      el.arrLength = arrayLength;
    });
    return filteredList.sort((a, b) => (a.arrLength > b.arrLength ? -1 : 1));
  }

  get list(): Array<IUser> {
    return userStateList.getMainList;
  }
  get selectedList(): Array<IUser> {
    return userStateList.getSelectedList;
  }
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  .col {
    width: 50%;
    padding: 0 3rem;
    &__buttons {
      display: flex;
      justify-content: space-around;
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
        width: 130px;
        background: antiquewhite;
      }
    }
  }
}
</style>
