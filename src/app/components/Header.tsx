import { AppBar, Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const handleDay = (e: any) => {
    e.preventDefault()
    router.push('/')
  }

  const handleMonth = (e: any) => {
    e.preventDefault()
    router.push('/month')
  }

  const handleType = (e: any) => {
    e.preventDefault()
    router.push('/type')
  }

  return (
    <AppBar position='static'>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
        <Button onClick={handleDay} sx={{ my: 2, color: 'white', display: 'block' }}>
          Home
        </Button>
        <Button onClick={handleMonth} sx={{ my: 2, color: 'white', display: 'block' }}>
          Month
        </Button>
        <Button onClick={handleType} sx={{ my: 2, color: 'white', display: 'block' }}>
          Type
        </Button>
      </Box>
    </AppBar>
  )
}
