import { useContext } from 'react';
import { MenuOutlined } from '@mui/icons-material'
import { AppBar,Toolbar,IconButton,Typography } from '@mui/material'
import { UIContext } from '../../context/ui';



export const Navbar = () => {

  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton size='large' edge='start' onClick={ openSideMenu }>
              <MenuOutlined/>
            </IconButton>
            <Typography variant='h6' component='div' sx={{flexGrow:1}}> Open Jira</Typography>
        </Toolbar>
    </AppBar>
  )
}