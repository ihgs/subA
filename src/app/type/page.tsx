'use client'
import { useState } from 'react'
import { MonthInterface, MonthSelector } from '../components/MonthSelector'
import dayjs from 'dayjs'
import { DailyCards } from '../components/DailyCards'
import { asClass, createContainer } from 'awilix'
import { IndexedDb } from '../libs/recorder/indexedDb'
import { ContainerContext } from '../libs/recorder/base'
import { TypeManager } from '../components/TypeManager'
import { TypeDb } from '../libs/recorder/TypeDb'

const today = dayjs()

export default function Type() {
  const container = createContainer()
  container.register({ recorder: asClass(TypeDb).singleton() })

  return (
    <>
      <ContainerContext.Provider value={container}>
        <TypeManager />
      </ContainerContext.Provider>
    </>
  )
}
