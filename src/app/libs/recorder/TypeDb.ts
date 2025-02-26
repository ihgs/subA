import { Recorder } from '@/app/interfaces'
import { db } from '../db'

class TypeDb implements Recorder<MyType> {
  async save(orwork: MyType): Promise<MyType> {
    const id = await db.types.add(orwork)
    return { id, ...orwork }
  }

  async update(work: MyType): Promise<MyType> {
    if (work.id) {
      await db.types.update(work.id, work)
      return { ...work }
    }
    throw Error('invalid data')
  }

  async list(): Promise<MyType[]> {
    return await db.types.toArray()
  }

  async listByDay(year: number, month: number, day: number): Promise<MyType[]> {
    throw Error('not implemented')
  }

  async listByMonth(year: number, month: number): Promise<MyType[]> {
    throw Error('not implemented')
  }

  async delete(id: number): Promise<void> {
    await db.types.delete(id)
  }

  async listTypes(): Promise<MyType[]> {
    return await db.types.toArray()
  }
}
export { TypeDb }
