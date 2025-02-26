import { Recorder } from '@/app/interfaces'

class MemoryDB implements Recorder<Work> {
  list(): Promise<Work[]> {
    throw new Error('Method not implemented.')
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
  listTypes(): Promise<MyType[]> {
    throw new Error('Method not implemented.')
  }
  inworks: Work[] = [
    {
      id: 1,
      year: 2021,
      month: 1,
      day: 1,
      version: 1,
      item: '正月',
      start: '12:00',
      end: '14:00',
      type: 'イベント',
    },
    {
      id: 2,
      year: 2021,
      month: 2,
      day: 2,
      version: 1,
      item: '節分？',
      start: '13:00',
      end: '16:00',
      type: 'イベント',
    },
    {
      id: 3,
      year: 2021,
      month: 3,
      day: 3,
      version: 1,
      item: 'ひなまつり',
      start: '14:00',
      end: '15:00',
      type: 'イベント',
    },
  ]

  async save(work: Work): Promise<Work> {
    const n: Work = { ...work }
    n.id = this.inworks.length + 1
    console.log(n)
    this.inworks.push(n)
    return n
  }
  async update(work: Work): Promise<Work> {
    const n = { ...work }
    return n
  }
  async listByDay(year: number, month: number, day: number): Promise<Work[]> {
    return JSON.parse(JSON.stringify(this.inworks))
  }
  async listByMonth(year: number, month: number): Promise<Work[]> {
    const works = [
      {
        id: 1,
        year: 2023,
        month: 11,
        day: 1,
        start: '09:00',
        end: '10:00',
        item: 'testAItem',
        type: 'testAType',
        comment: 'testAComment',
      },
      {
        id: 2,
        year: 2023,
        month: 11,
        day: 1,
        start: '10:00',
        end: '11:00',
        item: 'testBItem',
        type: 'testBType',
        comment: 'testBComment',
      },
      {
        id: 3,
        year: 2023,
        month: 11,
        day: 2,
        start: '11:00',
        end: '12:00',
        item: 'testCItem',
        type: 'testCType',
        comment: 'testCComment',
      },
      {
        id: 4,
        year: 2023,
        month: 11,
        day: 2,
        start: '12:00',
        end: '13:00',
        item: 'testDItem',
        type: 'testDType',
        comment: 'testDComment',
      },
      {
        id: 5,
        year: 2023,
        month: 11,
        day: 3,
        start: '13:00',
        end: '14:00',
        item: 'testEItem',
        type: 'testEType',
        comment: 'testEComment',
      },
      {
        id: 6,
        year: 2023,
        month: 11,
        day: 10,
        start: '14:00',
        end: '14:30',
        item: 'testFItem',
        type: 'testFType',
        comment: 'testFComment',
      },
    ]

    return works
  }
}
export { MemoryDB }
