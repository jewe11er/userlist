import { Route, RawLocation } from "vue-router";

export interface Base {
  id: number,
  name: string,
  arrLength: number,
}

export interface IUser extends Base {
  items: Base
}

export interface RootState extends IUser {
  action: string,
  time: string
}

export interface Links {
  title: string,
  query: string
}

export type NavigationGuard<V extends Vue> = (
  to: Route,
  from: Route,
  next: (to?: RawLocation | false | ((vm: V) => any) | void) => void
) => any
