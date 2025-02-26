import { atom } from 'recoil'

export const workListState = atom<Work[]>({
  key: 'workListState',
  default: [],
})
