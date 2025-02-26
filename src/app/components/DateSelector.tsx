import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateInterface } from '../types'

interface DateSelectorProps {
  year?: number
  month?: number
  day?: number
  onChange: (date: DateInterface) => void
}

const today = dayjs()

export function DateSelector({
  year = today.year(),
  month = today.month() + 1,
  day = today.date(),
  onChange,
}: DateSelectorProps) {
  const handleChange = (newValue: any) => {
    onChange({ year: newValue.year(), month: newValue.month() + 1, day: newValue.date() })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ja'}>
      <DesktopDatePicker
        defaultValue={dayjs()
          .year(year)
          .month(month - 1)
          .date(day)}
        format='YYYY/MM/DD'
        onChange={handleChange}
      />
    </LocalizationProvider>
  )
}
