import { Module, VuexModule, Mutation, Action, getModule  } from 'vuex-module-decorators'
import store from '@/store'

import { RootState } from "@/types";

@Module({dynamic: true, namespaced: true,
  name: 'Story', store})
class Story extends VuexModule {
  storyList: Array<RootState> = []

  @Mutation
  ADD_TO_LIST(item: RootState) {
    this.storyList = [item, ...this.storyList]
  }

  @Action({ commit: 'ADD_TO_LIST' })
  addToList(item: RootState): RootState {
    return item
  }
  get getFullList(): Array<RootState> {
    return this.storyList
  }
  get getAddList(): Array<RootState> {
    return this.storyList.filter(el => el.action === 'Add')
  }
  get getRemoveList(): Array<RootState> {
    return this.storyList.filter(el => el.action === 'Remove')
  }
}

export const userStoryList =  getModule(Story)

