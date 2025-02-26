export interface Recorder<T> {
  save(obj: T): Promise<T>
  update(obj: T): Promise<T>
  list(): Promise<T[]>
  listByDay(year: number, month: number, day: number): Promise<T[]>
  listByMonth(year: number, month: number): Promise<T[]>
  delete(id: number): Promise<void>
  listTypes(): Promise<MyType[]>
}
