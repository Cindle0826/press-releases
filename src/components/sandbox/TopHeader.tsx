import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'

const TopHeader = () => {
  return (
    // zIndex 確保 導航欄在 左側欄之上 
    // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    <AppBar position="fixed"
      sx={{
        height: '80px',
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '2px solid #ddd'
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'gray' }}>
          Clipped drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TopHeader