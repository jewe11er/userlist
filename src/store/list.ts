import { Module, VuexModule, Mutation, Action, getModule  } from "vuex-module-decorators";
import axios from "axios";

import store from "@/store";

import { IUser } from "@/types";

@Module({dynamic: true, namespaced: true,
  name: "stateList", store})
class StateList extends VuexModule {
  mainList: Array<IUser> = []
  selectedList: Array<IUser> = []

  @Mutation
  LOAD_LIST(item: IUser[]) {
    this.mainList = [...item];
  }
  @Mutation
  SET_MAIN_LIST(item: IUser) {
    this.mainList = [item, ...this.mainList];
  }
  @Mutation
  DEL_MAIN_LIST(index: number) {
    this.mainList = this.mainList.filter(el => el.id !== index);
  }
  @Mutation
  SET_SELECTED_LIST(item: IUser) {
    this.selectedList = [item, ...this.selectedList];
  }
  @Mutation
  DEL_SELECTED_LIST(index: number) {
    this.selectedList = this.selectedList.filter(el => el.id !== index);
  }

  @Action({ commit: "SET_MAIN_LIST" })
  setMainList(item: IUser): IUser {
    return item;
  }
  @Action({ commit: "SET_SELECTED_LIST" })
  setSelectedList(item: IUser): IUser {
    return item;
  }
  @Action({ commit: "DEL_MAIN_LIST" })
  delMainList(index: number): number {
    return index;
  }
  @Action({ commit: "DEL_SELECTED_LIST" })
  delSelectedList(index: number): number {
    return index;
  }
  @Action({ commit: "LOAD_LIST"})
  async loadList(): Promise<IUser[]> {
    const {data} = await axios.get('https://5fac269d03a60500167e7989.mockapi.io/list');
    return data;
  }

  get getMainList(): Array<IUser> {
    return this.mainList;
  }
  get getSelectedList(): Array<IUser> {
    return this.selectedList;
  }
}

export const userStateList =  getModule(StateList);

