'use client'
import styles from './page.module.css'
import { asClass, createContainer } from 'awilix'
import { IndexedDb } from './libs/recorder/indexedDb'
import { ContainerContext } from './libs/recorder/base'
import { DateSelector } from './components/DateSelector'
import WorkCards from './components/WorkCards'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import { DateInterface } from './types'
import { myParseInt } from './libs/utils'

const today = dayjs()

export default function Home() {
  const searchParams = useSearchParams()
  const container = createContainer()
  container.register({ recorder: asClass(IndexedDb).singleton() })

  const initDate = {
    year: myParseInt(searchParams.get('year'), today.year()),
    month: myParseInt(searchParams.get('month'), today.month() + 1),
    day: myParseInt(searchParams.get('day'), today.date()),
  }
  const [targetDate, setTargetDate] = useState<DateInterface>(initDate)

  const handleDateSlector = (slectedDate: DateInterface) => {
    setTargetDate({ ...slectedDate })
  }

  return (
    <main className={styles.main}>
      <ContainerContext.Provider value={container}>
        <DateSelector
          onChange={handleDateSlector}
          year={initDate.year}
          month={initDate.month}
          day={initDate.day}
        />
        <WorkCards date={targetDate} />
      </ContainerContext.Provider>
    </main>
  )
}
