import Dexie, { Table } from 'dexie'

const version = 3

export class MyRecordDexie extends Dexie {
  works!: Table<Work, number>
  types!: Table<MyType, number>

  constructor() {
    super('myWorks')
    this.version(version).stores({
      works: '++id, [year+month+day], [year+month]',
      types: '++id',
    })
  }
}

export const db = new MyRecordDexie()
