import { Recorder } from '@/app/interfaces'
import { db } from '../db'

class IndexedDb implements Recorder<Work> {
  async save(orwork: Work): Promise<Work> {
    const work = { ...orwork }
    if (work.id == undefined || work.id <= -1) {
      delete work.id
      work.version = 1
      const id = await db.works.add(work)
      return { id, ...work }
    } else {
      return await this.update(work)
    }
  }

  async update(work: Work): Promise<Work> {
    if (work.version == undefined || work.id == undefined) {
      throw new Error('Invalid data')
    }
    const current = await db.works.get(work.id)
    if (current?.version !== work.version) {
      throw new Error('Data is old.')
    }
    work.version = work.version + 1
    await db.works.update(work.id, work)
    return { ...work }
  }

  async list(): Promise<Work[]> {
    throw new Error('not implemented')
  }

  async listByDay(year: number, month: number, day: number): Promise<Work[]> {
    return await db.works.where({ year: year, month: month, day: day }).sortBy('start')
  }

  async listByMonth(year: number, month: number): Promise<Work[]> {
    return await db.works.where({ year: year, month: month }).sortBy('day')
  }

  async delete(id: number): Promise<void> {
    throw new Error('not implemented')
  }

  async listTypes(): Promise<MyType[]> {
    return await db.types.toArray()
  }
}
export { IndexedDb }
