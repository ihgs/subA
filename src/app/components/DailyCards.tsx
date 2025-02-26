import dayjs from 'dayjs'
import { DailyCard } from './DailyCard'
import { useContext, useEffect, useState } from 'react'
import { ContainerContext } from '../libs/recorder/base'
import { Recorder } from '../interfaces'
import { stringify } from 'yaml'
import { Button } from '@mui/material'
import { DailyCardsProps } from '../types'



export function DailyCards({ month }: Readonly<DailyCardsProps>) {
  const container = useContext(ContainerContext)
  const [dates, setDates] = useState<Work[][]>([])
  let recorder: any
  if (container) {
    recorder = container.resolve<Recorder<Work>>('recorder')
  }
  useEffect(() => {
    const initArray = async () => {
      const dates: Work[][] = []
      const lastDate = dayjs()
        .year(month.year)
        .month(month.month - 1)
        .date(1)
        .endOf('month')
      for (let i = 0; i < lastDate.date(); i++) {
        dates[i] = []
      }

      const works = await recorder.listByMonth(month.year, month.month)

      works.forEach((work: any) => {
        dates[work.day - 1].push(work)
      })
      setDates(dates)
    }
    initArray()
  }, [month])

  const [copied, setCopied] = useState<string>('')
  const copy = () => {
    const yml: any = {}
    dates.forEach((data, index) => {
      const dailyDate: any[] = []
      data.forEach((datum) => {
        dailyDate.push({
          s: datum.start,
          e: datum.end,
          i: datum.item,
          t: datum.type,
          c: datum.comment,
        })
      })
      const key = `_${month.year}_${month.month}_${index + 1}`
      yml[key] = dailyDate
    })
    if (navigator.clipboard) {
      navigator.clipboard.writeText(stringify(yml))
      setCopied('Copied!!')
      setTimeout(() => {
        setCopied('')
      }, 1500)
    }
  }

  const offset = new Date(month.year, month.month - 1, 1).getDay()

  return (
    <>
      <Button sx={{ m: 1 }} size='small' variant='outlined' onClick={copy}>
        Copy
      </Button>
      {copied}
      <div></div>
      {dates.map((dateData, index) => {
        return (
          <DailyCard
            key={`${month.year}-${index}`}
            year={month.year}
            month={month.month}
            day={index + 1}
            works={dateData}
            offset={offset}
          />
        )
      })}
    </>
  )
}
