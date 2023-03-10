import { useContext } from 'react';
import { MenuOutlined } from '@mui/icons-material'
import { AppBar,Toolbar,IconButton,Typography, Link } from '@mui/material'
import { UIContext } from '../../context/ui';
import NextLink from 'next/link';



export const Navbar = () => {

  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton size='large' edge='start' onClick={ openSideMenu }>
              <MenuOutlined/>
            </IconButton>
              <NextLink href="/" passHref style={{color:'inherit', textDecoration:'none'}}>
                  <Typography variant='h6' component='div' sx={{flexGrow:1}}> Open Jira</Typography>  
              </NextLink>
        </Toolbar>
    </AppBar>
  )
}