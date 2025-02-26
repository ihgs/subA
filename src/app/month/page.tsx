'use client'
import { useState } from 'react'
import { MonthInterface, MonthSelector } from '../components/MonthSelector'
import dayjs from 'dayjs'
import { DailyCards } from '../components/DailyCards'
import { asClass, createContainer } from 'awilix'
import { IndexedDb } from '../libs/recorder/indexedDb'
import { ContainerContext } from '../libs/recorder/base'

const today = dayjs()

export default function MonthWorks() {
  const container = createContainer()
  container.register({ recorder: asClass(IndexedDb).singleton() })

  const [targetMonth, setTargetMonth] = useState<MonthInterface>({
    year: today.year(),
    month: today.month() + 1,
  })

  const handleMonthSelector = (date: MonthInterface) => {
    setTargetMonth({ ...date })
  }
  return (
    <>
      <ContainerContext.Provider value={container}>
        <MonthSelector onChange={handleMonthSelector} />
        <DailyCards month={targetMonth} />
      </ContainerContext.Provider>
    </>
  )
}
