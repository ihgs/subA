import { Box, Button, Card, Divider, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { ReactNode, useState } from 'react'
import WorkCard from './WorkCard'
import { parseMin } from '../libs/utils'

const dayOfWeek = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)']

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX

const whichDayOfWeek = (day: number, offset: number) => {
  return dayOfWeek[(day + offset - 1) % 7]
}
interface DailyCardProps {
  year: number
  month: number
  day: number
  offset: number
  works: Work[]
}

interface RateOfWork {
  sum: number
  works: Work[]
}

const putMap = (work: Work, map: Map<string, RateOfWork>) => {
  let type = work.type
  if (type === '') {
    type = '__non_type__'
  }
  if (type) {
    let rateOfWork = map.get(type)

    if (!rateOfWork) {
      rateOfWork = { sum: 0, works: [] }
      map.set(type, rateOfWork)
    }

    const end = parseMin(work.end)
    const start = parseMin(work.start)
    rateOfWork.sum = rateOfWork.sum + end - start
    rateOfWork.works.push(work)
  }
}
export function DailyCard({ year, month, day, offset, works }: Readonly<DailyCardProps>) {
  const [show, setShow] = useState<boolean>(false)
  const [showRate, setShowRate] = useState<boolean>(false)
  const rateMap = new Map<string, RateOfWork>()

  const renderWorks = () => {
    const workList: ReactNode[] = []
    works.forEach((work) => {
      workList.push(<WorkCard key={work.id} work={work} edit={false} onlyDisplay={true} />)
    })
    return workList
  }

  const renderRate = (sum: number) => {
    const workList: ReactNode[] = []
    let total = 0
    rateMap.forEach((value, key) => {
      let displayKey = key
      if (key === '__non_type__') {
        displayKey = '_'
      }
      const rate = Math.round((value.sum / sum) * 100)
      workList.push(
        <Grid container alignItems={'center'} columnSpacing={1} sx={{ wordWrap: 'break-word' }}>
          <Grid xs={2}>{displayKey}</Grid>
          <Grid xs={2}>{rate}% / {value.sum} min</Grid>
        </Grid>,
      )
      total = total + rate
    })
    workList.push(<Divider />)
    workList.push(
      <Grid container alignItems={'center'} columnSpacing={1} sx={{ wordWrap: 'break-word' }}>
        <Grid xs={2}>合計</Grid>
        <Grid xs={2}>{total}</Grid>
      </Grid>,
    )
    return workList
  }
  
  const renderSum = (sum: number)=>{
    let color = "black";
    if (sum == 0){
      color = "gray"
    }else if (sum > 0 && sum < 6){
      color = "red"
    } else if (sum < 8) {
      color = "#F8B500"
    }
    return (
      <Typography sx={{color}}>
        {sumH} H
      </Typography>
      )
  }

  let sum = 0
  works.forEach((work: Work) => {
    const end = parseMin(work.end)
    const start = parseMin(work.start)
    sum += end - start
    putMap(work, rateMap)
  })
  const sumH = sum / 60.0



  return (
    <>
      <Grid container alignItems={'center'}>
        <Grid xs={2}>
          {day} {whichDayOfWeek(day, offset)}
        </Grid>
        <Grid xs={8}>
          {renderSum(sumH)}
        </Grid>
        <Grid xs={2} spacing={2}>
          <Box display={'flex'} justifyContent={'flex-end'}>
            {sumH > 0 && (
              <>
                <Button
                  sx={{ m: 1 }}
                  variant='outlined'
                  onClick={() => {
                    setShow(!show)
                  }}
                  size={'small'}
                >
                  {show ? 'Hidden' : 'Show'}
                </Button>
                <Button
                  sx={{ m: 1 }}
                  variant='outlined'
                  onClick={() => {
                    setShowRate(!showRate)
                  }}
                  size={'small'}
                >
                  {showRate ? 'Hidden Rate' : 'Show Rate'}
                </Button>
              </>
            )}
            <Button
              sx={{ m: 1 }}
              variant='outlined'
              size={'small'}
              href={`${assetPrefix}/?year=${year}&month=${month}&day=${day}`}
            >
              Go
            </Button>
          </Box>
        </Grid>
      </Grid>
      {show && <Card sx={{ marginLeft: 2 }}>{renderWorks()}</Card>}
      {showRate && <Card sx={{ marginLeft: 2 }}>{renderRate(sum)}</Card>}
      <Divider />
    </>
  )
}
