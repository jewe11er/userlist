import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/types';

Vue.use(Vuex);

const store: StoreOptions<Array<RootState>> = {};

export default new Vuex.Store<Array<RootState>>(store);
