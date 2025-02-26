import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export interface MonthInterface {
  year: number
  month: number
}

export interface MonthSelectorProps {
  year?: number
  month?: number
  onChange: (date: MonthInterface) => void
}

const today = dayjs()

export function MonthSelector({
  year = today.year(),
  month = today.month() + 1,
  onChange,
}: MonthSelectorProps) {
  const handleChange = (newValue: any) => {
    onChange({ year: newValue.year(), month: newValue.month() + 1 })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ja'}>
      <DesktopDatePicker
        openTo='month'
        defaultValue={dayjs()
          .year(year)
          .month(month - 1)}
        format='YYYY/MM'
        views={['year', 'month']}
        onChange={handleChange}
      />
    </LocalizationProvider>
  )
}
